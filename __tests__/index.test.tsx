import { getPlansAvailable } from "@/utils";
import { renderWithProviders } from "@/utils/test-utils";
import { setupStore } from "@/store";
import Home from "@/pages/index";

jest.mock("next/router", () => require("next-router-mock"));

test("Renders the Home correctly", () => {
  const plansAvailable = getPlansAvailable();

  const store = setupStore();
  const { getByText } = renderWithProviders(<Home plans={plansAvailable} />, {
    store,
  });

  const title = getByText(/Nutrition plans that lead to results/i);
  expect(title).toBeInTheDocument;
});
