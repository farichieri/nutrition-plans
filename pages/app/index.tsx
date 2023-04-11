import PremiumLayout from "@/components/Layout/PremiumLayout";
import { MEAL_PLANS } from "@/utils/content";

const App = () => {
  return (
    <PremiumLayout>
      <section className="flex flex-col gap-4 p-4">
        <div>Plans</div>
        <div className="flex w-full flex-wrap gap-10 ">
          {MEAL_PLANS.map((plan) => (
            <div className="" key={plan.name}>
              {plan.name}
            </div>
          ))}
        </div>
      </section>
    </PremiumLayout>
  );
};

export default App;
