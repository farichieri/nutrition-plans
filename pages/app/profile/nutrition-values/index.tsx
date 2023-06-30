import Results from "@/features/authentication/components/create-user/results/Results";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <ProfileLayout>
      <Results handleSubmit={handleSubmit} />
    </ProfileLayout>
  );
}
