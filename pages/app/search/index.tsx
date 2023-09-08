import { FilterQueries } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTour } from "@/features/tours";
import SearchLayout from "@/layouts/SearchLayout";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  const queries: FilterQueries = {};

  Object.entries(router?.query).forEach((query) => {
    if (query) {
      queries[query[0] as keyof FilterQueries] = String(query[1]);
    }
  });

  useTour({
    name: "search",
    user: user,
    steps: () => [
      {
        element: document.querySelector("#tour-search-0"),
        title: "Search Section",
        intro: "Let's have a quick tour in the Search section!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-search-1"),
        title: "Search Writing",
        intro: "You can search a food typing its name here!",
        position: "bottom",
      },
      {
        element: document.querySelector("#tour-search-2"),
        title: "Filter your Search",
        intro: "You can apply filters to your search here!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-search-3"),
        title: "Where Search",
        intro: "You can search in all the foods or in your creations!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-search-4"),
        title: "Create",
        intro: "You can create a Food or a Recipe if you want to!",
        position: "left",
      },
      {
        element: document.querySelector("#tour-search-5"),
        title: "Foods",
        intro:
          "You can go to the food default by clicking on it! To add it to favorites click the heart. (Favorites is inside Library)",
        position: "top",
      },
    ],
  });

  return <SearchLayout queries={queries}>{}</SearchLayout>;
}
