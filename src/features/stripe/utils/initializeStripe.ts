import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

// Maybe I dont need this function.
const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  }
  return stripePromise;
};

export default initializeStripe;
