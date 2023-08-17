import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function createCheckoutSession({
  uid,
  priceId,
}: {
  uid: string;
  priceId: string;
}) {
  try {
    // Create a new checkout session in the subollection inside this users document
    const checkoutSessionRef = doc(
      collection(db, "users", uid, "checkout_sessions")
    );
    await setDoc(checkoutSessionRef, {
      price: priceId,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      collect_shipping_address: false,
      tax_id_collection: false,
      success_url: `${window.location.origin}/app/today`,
      cancel_url: `${window.location.origin}/app/today`,
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(checkoutSessionRef, async (snap) => {
      const data = snap.data();
      console.log({ data });
      const { url, error } = data as { url: string; error: any };

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        return;
      }
      if (url) {
        window.location.assign(url);
      }
    });
  } catch (error) {
    console.log({ error });
  }
}
