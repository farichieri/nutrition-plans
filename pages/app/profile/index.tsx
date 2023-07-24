import { ProfileNav } from "@/features/profile";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar/Avatar";
import ProfileLayout from "@/layouts/ProfileLayout";
import { Favorites, FavoritesTypeSelector } from "@/features/favorites";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  return (
    <ProfileLayout>
      <div className="m-auto w-full max-w-xl lg:hidden">
        <div className="flex flex-col">
          <span className="mx-auto text-xl font-semibold">Profile</span>
          <div className="flex items-center justify-between  py-2">
            <div className="flex flex-col items-start justify-center  opacity-60">
              <span className="opacity-100">{user?.displayName}</span>
              <span className="opacity-70">{user?.emailAddress}</span>
            </div>
            <Avatar width={75} height={75} />
          </div>
        </div>
        <ProfileNav />
      </div>
    </ProfileLayout>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
