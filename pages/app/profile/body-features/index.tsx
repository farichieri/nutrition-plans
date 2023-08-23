import { selectAuthSlice } from "@/features/authentication";
import BMRCalculator from "@/features/authentication/components/create-user/body-features/BodyFeatures";
import { useTour } from "@/features/tours";
import ProfileLayout from "@/layouts/ProfileLayout";
import { useSelector } from "react-redux";

export default function Page() {
  const handleContinue = () => {};
  const { user } = useSelector(selectAuthSlice);
  useTour({
    name: "profile_body",
    user: user,
    pushWhenFinished: "/app/profile/preferred-plan",
    steps: () => [
      {
        element: document.querySelector("#tour-profile_body-0"),
        title: "Body Features",
        intro: "Here you can update your body features",
      },
      {
        element: document.querySelector("#tour-profile_body-1"),
        title: "Units",
        intro:
          "You can choose between metric and imperial units. The units selected will be used in the whole app. You can also change the units in the settings page.",
      },
      {
        element: document.querySelector("#tour-profile_body-2"),
        title: "General Information",
        intro:
          "Once selected the units, you can update your general information: Gender, Height, Weight and Age.",
      },
      {
        element: document.querySelector("#tour-profile_body-3"),
        title: "Activity",
        intro:
          "You can choose between 5 different activity levels. The activity level selected will be used to calculate your maintenance calories.",
      },
    ],
  });
  return (
    <ProfileLayout>
      <BMRCalculator handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
