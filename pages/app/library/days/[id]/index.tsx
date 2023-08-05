import { LibraryDietsLayout } from "@/layouts";
import { SavedDietModal } from "@/features/library";

interface Props {}

export default function Page(): Props {
  return (
    <LibraryDietsLayout>
      <SavedDietModal />
    </LibraryDietsLayout>
  );
}
