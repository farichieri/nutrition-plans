import PlanModal from "@/features/favorites/components/favorite_days/day_modal";
import LibraryDaysLayout from "@/layouts/library_layout/days_layout";

interface Props {}

export default function Page(): Props {
  return (
    <LibraryDaysLayout>
      <PlanModal />
    </LibraryDaysLayout>
  );
}
