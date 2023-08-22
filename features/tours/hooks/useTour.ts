import { postSeenTour } from "../services";
import { Tours, User } from "@/features/authentication";
import { useEffect } from "react";
import introJs from "intro.js";

const useTour = ({
  name,
  user,
  steps,
  options = {},
}: {
  name: keyof Tours;
  options?: any;
  steps: () => any[];
  user: User | null;
}) => {
  useEffect(() => {
    if (!user) return;

    const unsubscribe = async () => {
      let markedAsSeenInBrowser = window.localStorage.getItem(`tour.${name}`);
      let markedAsSeenInDB = user.tours?.[name as keyof Tours];
      let tour = introJs();

      // If the tour has been seen in the browser but not in the DB, save it in the DB
      if (markedAsSeenInBrowser && !markedAsSeenInDB) {
        await postSeenTour({ user, tour: name as keyof Tours });
      }

      // If the tour has been seen in the browser or in the DB, don't show it
      if (markedAsSeenInBrowser || markedAsSeenInDB) return;

      const refreshTourSteps = () => {
        const timeout = setTimeout(() => {
          tour.setOptions({
            steps: steps().filter((step) => stepIsDisplayable(step)),
          });
          tour.refresh(true);
        }, 200);
        return () => clearTimeout(timeout);
      };

      const stepIsDisplayable = (step: any) => {
        if (!step.hasOwnProperty("element")) {
          return true;
        }
        return step.element && !!step.element?.getClientRects().length;
      };

      tour
        .setOptions({
          overlayOpacity: 0.4,
          exitOnEsc: false,
          exitOnOverlayClick: false,
          skipLabel: "Skip",
          nextLabel: "Next",
          prevLabel: "Back",
          doneLabel: "Finish!",
          showBullets: false,
          showProgress: true,
          showStepNumbers: false,
          disableInteraction: true,
          steps: steps().filter((step) => stepIsDisplayable(step)),
          ...options,
        })
        .oncomplete(() => {
          window.removeEventListener("resize", () => refreshTourSteps());
          window.localStorage.setItem(`tour.${name}`, "true");
        })
        .onexit(async () => {
          window.removeEventListener("resize", () => refreshTourSteps());
          window.localStorage.setItem(`tour.${name}`, "true");
          // Save in DB
          await postSeenTour({ user, tour: name as keyof Tours });
        })
        .start();

      window.addEventListener("resize", () => refreshTourSteps());
    };
    unsubscribe();
  }, []);
};

export default useTour;
