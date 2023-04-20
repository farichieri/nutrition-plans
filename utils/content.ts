import { SubscriptionPlan } from "@/types/types";

export const FAQS_INDEX = [
  {
    title: "What plans are available in Nutrition Plans?",
    answer:
      "The plans available today are: Weight Loss, Gain Muscle Mass, Balanced and Gluten Free",
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
    name: "Gluten Free",
    id: "gluten-free",
  },
  {
    name: "Mediterranean",
    id: "mediterranean",
  },
  {
    name: "Keto",
    id: "keto",
  },
  {
    name: "Vegetarian",
    id: "vegetarian",
  },
  {
    name: "Low Carb",
    id: "low-carb",
  },

  // {
  //   name: "Paleo",
  //   id: "paleo",
  // },
  // {
  //   name: "Protein",
  //   id: "protein",
  // },
  // {
  //   name: "Vegan",
  //   id: "vegan",
  // },
];

// Orders 1.Balanced, 2.Mediterranean, 3.Keto, 4.Low Carb, 5. Vegetarian, 6.Gluten-foree

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    buttonContent: "Get started with Free",
    checklist: ["Plan Calculator", "Weekly Newsletter"],
    checklistTitle: "",
    checkoutLink: "/app/billing",
    discount: "",
    monthlyPrice: 0,
    name: "Free",
    plan_id: "free",
    yearlyPrice: 0,
  },
  {
    buttonContent: "Get started with Premium",
    checklist: ["All nutrition plans", "Shopping List"],
    checklistTitle: "Everything in Free, plus...",
    checkoutLink: "/app/billing",
    discount: "-20%",
    monthlyPrice: 10,
    name: "Premium",
    plan_id: "premium",
    yearlyPrice: 8,
  },
  // {
  //   buttonContent: "Get started with Plus",
  //   checklist: ["Access to All our plans"],
  //   checklistTitle: "Everything in Standard, plus...",
  //   checkoutLink: "/app/billing",
  //   discount: "-20%",
  //   monthlyPrice: 50,
  //   name: "Plus",
  //   plan_id: "plus",
  //   yearlyPrice: 40,
  // },
];

export const CONTACT_EMAIL = "frichieri.dev@gmail.com";
