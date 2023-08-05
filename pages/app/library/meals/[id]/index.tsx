import { SavedMealModal } from "@/features/library";
import { LibraryMealsLayout } from "@/layouts";

interface Props {}

export default function Page(): Props {
  return (
    <LibraryMealsLayout>
      <SavedMealModal />
    </LibraryMealsLayout>
  );
}
