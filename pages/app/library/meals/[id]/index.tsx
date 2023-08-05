import { MealModal } from "@/features/favorites";
import LibraryMealsLayout from "@/layouts/library_layout/meals_layout";

interface Props {}

export default function Page(): Props {
  return (
    <LibraryMealsLayout>
      <MealModal />
    </LibraryMealsLayout>
  );
}
