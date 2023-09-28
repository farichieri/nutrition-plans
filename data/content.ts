import { SubscriptionPlan } from "@/types";

export const FAQS_INDEX = [
  {
    title: "What is Nutrition Plans?",
    answer:
      "Nutrition Plans is a tool that helps you to create your own meal plans based on your goals and preferences. You can choose from a variety of plans and customize them to your needs.",
  },
  {
    title: "Who is Nutrition Plans for?",
    answer:
      "Nutrition Plans is for anyone who wants to eat healthier and achieve their goals. Whether you want to lose weight, gain muscle or just eat healthier.",
  },
  {
    title: "How can Nutrition Plans help me to achieve my goals?",
    answer:
      "Nutrition Plans helps you to create personalized meal plans based on your goals and Plan selected. It tracks the exactly amount of calories and macronutrients based on what you eat and it guides you to reach the nutrients you need every day to achieve your goals. It also helps you to track your progress and to stay motivated.",
  },
  {
    title: "What plans are available in Nutrition Plans?",
    answer:
      "The plans available at this moment are: Vegetarian, Mediterranean, Keto, Low Carb, Gluten Free and Balanced.",
  },
  {
    title: "How does it work?",
    answer:
      "You configure your profile, goals and preferences. Then you generate your meal plan for the day (or days ahead). And you check the foods you eat during the day. It's that simple!. The platform will show you if you are on track to reach your goals and it will help you to adjust your plan if needed.",
  },
  {
    title: "Are you going to add more plans in the future?",
    answer: "Yes, we are planning to add Paleo, protein, vegan and more plans.",
  },
  {
    title: "What if I don't like the foods in my Day?",
    answer:
      "You can customize your removing foods you don't like. Or you can Add the foods very easily. You can also change the quantities of every food. You can do all of this and more in the Plan Editor.",
  },
  {
    title: "What if I don't find a food in the database?",
    answer:
      "You can create your own foods and recipes and add its nutrients and use it freely in your plans. Then it will be available for all users after the approval of our team.",
  },
  {
    title: "Are all Plans included?",
    answer:
      "Yes, all plans are included. It means that you can create a different plan every day if you want. (eg: Monday: Keto, Tuesday: Low Carb, Wednesday: Vegetarian, etc.)",
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
    image: "/images/plans/balanced.png",
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
    image: "/images/plans/gluten-free.png",
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
    image: "/images/plans/mediterranean.png",
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
    image: "/images/plans/vegetarian.png",
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
    image: "/images/plans/low-carb.png",
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
  {
    name: "Keto",
    id: "keto",
    image: "/images/plans/keto.png",
    macros: {
      carbs: {
        min: 5,
        max: 10,
      },
      proteins: {
        min: 15,
        max: 25,
      },
      fats: {
        min: 60,
        max: 75,
      },
    },
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  // {
  //   buttonContent: "Get started with Free",
  //   checklist: [
  //     "Nutrients Calculator",
  //     "Weekly Newsletter",
  //     "7 days Premium trial",
  //   ],
  //   checklistTitle: "",
  //   checkoutLink: "/app/settings/billing",
  //   discount: "",
  //   id: "free",
  //   monthlyPrice: 0,
  //   name: "Free",
  //   yearlyPrice: 0,
  //   semestryPrice: 0,
  // },
  {
    buttonContent: "Start Free Trial",
    checklist: [
      "Meal planner",
      "Progress Tracker",
      "Foods Database",
      "Custom foods and recipes",
      "All nutrition plans",
    ],
    checklistTitle: "Everything in Free, plus...",
    checkoutLink: "/app/settings/billing",
    discount: "-20%",
    id: "premium",
    beta: true,
    betaDiscount: 50,
    monthlyPrice: 15,
    name: "Premium",
    yearlyPrice: 12,
    semestryPrice: 13.5,
  },
];

export const CONTACT_EMAIL = "frichieri.dev@gmail.com";
