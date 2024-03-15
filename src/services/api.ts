import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    "auth",
    "foods",
    "meals",
    "mealsSettings",
    "notifications",
    "plans",
    "progress",
    "emails",
  ],
  endpoints: () => ({}),
});
