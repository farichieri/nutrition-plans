import { LibraryFoods } from "@/features/library";
import { LibraryLayout } from "@/layouts";

export default function Page() {
  return (
    <LibraryLayout>
      <LibraryFoods />
    </LibraryLayout>
  );
}
