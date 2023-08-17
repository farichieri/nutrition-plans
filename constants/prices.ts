const PRICES = [
  {
    discount: null,
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!,
    monthlyPrice: 10,
    popular: false,
    title: "1 month",
    totalPrice: 10,
  },
  {
    discount: "20%",
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!,
    monthlyPrice: 8,
    popular: true,
    title: "12 months",
    totalPrice: 96,
  },
];

export default PRICES;
