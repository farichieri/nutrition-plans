import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import initializeStripe from "../utils/initializeStripe";

export default async function createCheckoutSession(uid: string) {
  try {
    // Create a new checkout session in the subollection inside this users document
    console.log({ uid });
    const checkoutSessionRef = doc(
      collection(db, "users", uid, "checkout_sessions")
    );
    await setDoc(checkoutSessionRef, {
      price: "price_1Nfjm9FDhIG3vS5SBINV3Oii",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(checkoutSessionRef, async (snap) => {
      const data = snap.data();
      console.log({ data });
      const { sessionId, error } = data as { sessionId: string; error: any };

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        return;
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await initializeStripe();
        if (!stripe) {
          throw new Error("Unable to initialize Stripe");
        }
        stripe.redirectToCheckout({ sessionId });
      } else {
        console.log("No session found");
      }
    });
  } catch (error) {
    console.log({ error });
  }
}
