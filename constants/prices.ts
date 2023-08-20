export const PRICES = {
  monthly: {
    discount: null,
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!,
    monthlyPrice: 15,
    popular: false,
    title: "1 month",
    totalPrice: 15,
  },
  yearly: {
    discount: "20%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!,
    monthlyPrice: 12,
    popular: true,
    title: "12 months",
    totalPrice: 144,
  },
  semestry: {
    discount: "10%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SEMESTRY!,
    monthlyPrice: 13.5,
    popular: false,
    title: "6 months",
    totalPrice: 90,
  },
};
