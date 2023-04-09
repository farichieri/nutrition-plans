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
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-10">
        {PLANS.map((plan) => (
          <Plan plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
