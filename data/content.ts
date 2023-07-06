import { SubscriptionPlan } from "@/types";

export const FAQS_INDEX = [
  {
    title: "What plans are available in Nutrition Plans?",
    answer:
      "The plans available at this moment are: Vegetarian, Mediterranean, Low Carb, Gluten Free and Balanced.",
  },
  {
    title: "Are you going to add more plans in the future?",
    answer:
      "Yes, we are planning to add Paleo, Keto, protein, vegan and more plans.",
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
    excludes: "nothing",
    macros: {
      carbs: {
        min: 55,
        max: 65,
      },
      proteins: {
        min: 15,
        max: 20,
      },
      fats: {
        min: 30,
        max: 35,
      },
    },
  },
  {
    name: "Gluten Free",
    id: "gluten_free",
    excludes: "any foods that contain gluten",
    macros: {
      carbs: {
        min: 55,
        max: 65,
      },
      proteins: {
        min: 15,
        max: 20,
      },
      fats: {
        min: 30,
        max: 35,
      },
    },
  },
  {
    name: "Mediterranean",
    id: "mediterranean",
    macros: {
      carbs: {
        min: 20,
        max: 35,
      },
      proteins: {
        min: 15,
        max: 20,
      },
      fats: {
        min: 45,
        max: 60,
      },
    },
  },
  {
    name: "Vegetarian",
    id: "vegetarian",
    excludes:
      "animal foods such as red beef, white meat such as chicken, pork, turkey and fish.",
    macros: {
      carbs: {
        min: 50,
        max: 55,
      },
      proteins: {
        min: 15,
        max: 20,
      },
      fats: {
        min: 30,
        max: 35,
      },
    },
  },
  {
    name: "Low Carb",
    id: "low_carb",
    macros: {
      carbs: {
        min: 10,
        max: 40,
      },
      proteins: {
        min: 20,
        max: 25,
      },
      fats: {
        min: 50,
        max: 60,
      },
    },
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    buttonContent: "Get started with Free",
    checklist: ["Plan Calculator", "Weekly Newsletter", "Foods Database"],
    checklistTitle: "",
    checkoutLink: "/app/billing",
    discount: "",
    monthlyPrice: 0,
    name: "Free",
    id: "free",
    yearlyPrice: 0,
  },
  {
    buttonContent: "Get started with Premium",
    checklist: [
      "All nutrition plans",
      "Shopping List",
      "Recipes",
      "Progress tools",
      "Print and email your plans",
    ],
    checklistTitle: "Everything in Free, plus...",
    checkoutLink: "/app/billing",
    discount: "-20%",
    monthlyPrice: 10,
    name: "Premium",
    id: "premium",
    yearlyPrice: 8,
  },
];

export const CONTACT_EMAIL = "frichieri.dev@gmail.com";
