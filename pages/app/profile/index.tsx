import { ProfileNav } from "@/features/profile";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  return <ProfileLayout>{<ProfileNav />}</ProfileLayout>;
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
