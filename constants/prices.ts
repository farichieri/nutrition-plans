export const PRICES = {
  monthly: {
    discount: "50%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!,
    monthlyPrice: 15,
    popular: false,
    title: "1 month",
    totalPrice: 15,
    discountPrice: 7.5,
  },
  yearly: {
    discount: "70%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!,
    monthlyPrice: 15,
    popular: true,
    title: "12 months",
    totalPrice: 144,
    discountPrice: 4.5,
  },
  semestry: {
    discount: "60%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SEMESTRY!,
    monthlyPrice: 15,
    popular: false,
    title: "6 months",
    totalPrice: 90,
    discountPrice: 6,
  },
};

export const DISCOUNTS = {
  monthly: {
    id: process.env.NEXT_PUBLIC_STRIPE_BETA_OFF_50_PERCENT!,
  },
  semestry: {
    id: process.env.NEXT_PUBLIC_STRIPE_BETA_OFF_60_PERCENT!,
  },
  yearly: {
    id: process.env.NEXT_PUBLIC_STRIPE_BETA_OFF_70_PERCENT!,
  },
};
