import DateSelector from "@/components/DateSelector";
import { ShoppingList } from "@/features/shopping";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

interface Props {}

export default function Page(): Props {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <section className="flex w-full flex-col gap-5 p-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-2xl font-medium">Shopping List of:</span>
          <DateSelector />
        </div>
        {/* <div className="flex flex-col justify-start">
          <span>I must select a date range to see the foods list.</span>
          <span>
            I will see the list of foods I need to buy or have bought in order
            to make the meals I have planned.
          </span>
          <span>
            The list will be divided by the food categories (Baked products,
            Vegetables, Sweets, etc.)
          </span>
          <span>Meals from planner are added automatically.</span>
          <span>I can add more here If I want.</span>
          <span>
            I will be able to check those foods I have already bought.
          </span>
          <span>The default date-range will be my current week.</span>
        </div> */}
        <ShoppingList />
      </section>
    </PremiumLayout>
  );
}
