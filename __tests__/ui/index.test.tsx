import Home from "@/pages/index";
import { getPlansAvailable } from "@/utils";
import { renderWithProviders } from "@/utils/test-utils";
import { screen } from "@testing-library/react";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Home test suite", () => {
  // every test (it) should be independent of each other
  it("should render Nutrition Plans that lead to results text", () => {
    const plansAvailable = getPlansAvailable();
    renderWithProviders(<Home plans={plansAvailable} />);

    // arrange:
    const sut = screen.getByText(/Nutrition plans that lead to results/i);
    const expected = "Nutrition plans that lead to results";

    // act:
    const actual = sut.textContent;

    // assert:
    expect(actual).toBe(expected);
  });

  it('should render a button with "Start my plan now"', () => {
    const plansAvailable = getPlansAvailable();
    renderWithProviders(<Home plans={plansAvailable} />);

    const sut = screen.getAllByText(/Start my plan now/i)[0];
    const expected = "Start my plan now";

    const actual = sut.textContent;

    expect(actual).toBe(expected);
  });

  it("should render a Demo image", () => {
    const plansAvailable = getPlansAvailable();
    renderWithProviders(<Home plans={plansAvailable} />);

    const sut = screen.getByAltText(/Demo/i);
    const expected = "Demo";

    const actual = sut.getAttribute("alt");

    expect(actual).toBe(expected);
  });
});
