import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { ensureError } from "@/utils";
import { Result } from "@/types";
import { DISCOUNTS, PRICES } from "@/constants";

export default async function createCheckoutSession({
  uid,
  priceId,
}: {
  uid: string;
  priceId: string;
}): Promise<Result<undefined, unknown>> {
  try {
    // Create a new checkout session in the sub collection inside this users document
    const checkoutSessionRef = doc(
      collection(db, "users", uid, "checkout_sessions")
    );

    const promotionCode = () => {
      if (priceId === PRICES.monthly.id) {
        return DISCOUNTS.monthly.id;
      } else if (priceId === PRICES.yearly.id) {
        return DISCOUNTS.yearly.id;
      } else if (priceId === PRICES.semestry.id) {
        return DISCOUNTS.semestry.id;
      } else {
        return undefined;
      }
    };

    await setDoc(checkoutSessionRef, {
      price: priceId,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      collect_shipping_address: false,
      tax_id_collection: false,
      success_url: `${window.location.origin}/app/today`,
      cancel_url: `${window.location.origin}/app/today`,
      promotion_code: promotionCode(),
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(checkoutSessionRef, async (snap) => {
      const data = snap.data();
      const { url, error } = data as { url: string; error: any };

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error happened: ${error.message}`);
        return;
      }
      if (url) {
        window.location.assign(url);
      }
    });
    return { result: "success", data: undefined };
  } catch (error) {
    const err = ensureError(error);
    console.log(err);
    return { result: "error", error: err };
  }
}
