import Avatar from "@/components/Avatar/Avatar";
import { Results, selectAuthSlice } from "@/features/authentication";
import { ProfileNav } from "@/features/profile";
import { useTour } from "@/features/tours";
import { useWindowWidth } from "@/hooks";
import ProfileLayout from "@/layouts/ProfileLayout";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  const handleSubmit = () => {};

  useTour({
    name: "profile",
    user: user,
    pushWhenFinished: "/app/profile/nutrition-values",
    steps: () => [
      {
        title: "Profile Section",
        intro: "Let's have a quick tour in the Profile section!",
        position: "right",
      },
    ],
  });

  return (
    <ProfileLayout>
      {isMobile ? (
        <div className="m-auto w-full max-w-xl lg:hidden">
          <div className="flex flex-col px-4">
            <span className="mx-auto text-3xl font-semibold">Profile</span>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col items-start justify-center  opacity-60">
                <span className="opacity-100">{user?.displayName}</span>
                <span className="opacity-70">{user?.emailAddress}</span>
              </div>
              <Avatar width={75} height={75} />
            </div>
          </div>
          <ProfileNav />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          <Results handleSubmit={handleSubmit} />
        </div>
      )}
    </ProfileLayout>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
