export const FAQS_INDEX = [
  {
    title: "What plans are available in Nutrition Plans?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "Question random?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "Another question random?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "And another?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
];

export const FAQS_PRICING = [
  {
    title: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your plan at any time. You will still have access to all plans previously adquired with Nutrition Plans.",
  },
  {
    title: "What payment methods are available?",
    answer: "Our secure Stripe checkout supports all major credit cards.",
  },
];

export const MEAL_PLANS = [
  {
    name: "Balanced",
    id: "balanced",
  },
  {
    name: "Weight Loss",
    id: "weight-loss",
  },
  {
    name: "Gain muscle mass",
    id: "gain-muscle-mass",
  },
  {
    name: "Paleo",
    id: "paleo",
  },
  {
    name: "Protein",
    id: "protein",
  },

  {
    name: "Vegetarian",
    id: "vegetarian",
  },
  {
    name: "Vegan",
    id: "vegan",
  },
  {
    name: "Low Carb",
    id: "low-carb",
  },
  {
    name: "Keto",
    id: "keto",
  },
  {
    name: "Gluten Free",
    id: "gluten-free",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    discount: "",
    checklistTitle: "",
    checklist: ["Plan Calculator", "Weekly Newsletter"],
    buttonContent: "Get started with Free",
    checkoutLink: "/app/billing",
  },
  {
    name: "Standard",
    monthlyPrice: 10,
    yearlyPrice: 8,
    discount: "-20%",
    checklistTitle: "Everything in Free, plus...",
    checklist: ["This", "That", "These"],
    buttonContent: "Get started with Standard",
    checkoutLink: "/app/billing",
  },
  {
    name: "Plus",
    monthlyPrice: 50,
    yearlyPrice: 40,
    discount: "-20%",
    checklistTitle: "Everything in Standard, plus...",
    checklist: ["This", "That", "These"],
    buttonContent: "Get started with Plus",
    checkoutLink: "/app/billing",
  },
];
