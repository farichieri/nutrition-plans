import Plan from "./Plan";

const Plans = () => {
  const PLANS = [
    {
      name: "Standard",
      monthlyPrice: 10,
      yearlyPrice: 96,
      discount: "-20%",
      checklistTitle: "",
      checklist: ["This", "That", "These"],
      buttonContent: "Get started with Standard",
      checkoutLink: "/checkout/standard",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-10">
      {PLANS.map((plan) => (
        <Plan plan={plan} key={plan.name} />
      ))}
    </div>
  );
};

export default Plans;
