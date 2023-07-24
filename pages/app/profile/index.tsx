import { Favorites, FavoritesTypeSelector } from "@/features/favorites";
import { ProfileNav } from "@/features/profile";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import { useWindowWidth } from "@/hooks";
import Avatar from "@/components/Avatar/Avatar";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
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
          <FavoritesTypeSelector />
          <Favorites />
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
