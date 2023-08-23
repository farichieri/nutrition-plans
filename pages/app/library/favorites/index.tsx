import { selectAuthSlice } from "@/features/authentication";
import { LibraryFoods } from "@/features/library";
import { useTour } from "@/features/tours";
import { LibraryLayout } from "@/layouts";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  useTour({
    name: "library",
    user: user,
    steps: () => [
      {
        element: document.querySelector("#tour-library-0"),
        title: "Library Section",
        intro: "Let's have a quick tour in the Library section!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-library-1"),
        title: "Fav Foods",
        intro:
          "You can see your favorite foods here. When you are planning a meal, you can select the Favorites button to only see your Favorites easily!",
        position: "bottom",
      },
      {
        element: document.querySelector("#tour-library-2"),
        title: "Saved Meals",
        intro:
          "You can see your saved meals here. When you are planning a day, you can load a Saved Meal easily in the Drop Down of the three dots of each meal!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-library-3"),
        title: "Saved Days",
        intro:
          "You can see your saved days here. When you are planning a day, you can load a Saved Day easily in the Drop Down of the three dots of the day!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-library-4"),
        title: "Other access to Library",
        intro: "You can access to Library from here too!",
        position: "left",
      },
    ],
  });

  return (
    <LibraryLayout>
      <LibraryFoods />
    </LibraryLayout>
  );
}
