import algoliaSearch from "algoliasearch/lite";

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID!;
const ALGOLIA_ADMIN_KEY = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY!;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;

export const ALGOLIA_FOODS_INDEX_NAME = "foods_nutritionplans";
export const algoliaClient = algoliaSearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
