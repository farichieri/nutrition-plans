import { SubscriptionPlan } from "@/types/types";

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
    checklist: ["All nutrition plans"],
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
