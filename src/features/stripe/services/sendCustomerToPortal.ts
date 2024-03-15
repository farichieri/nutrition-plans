import { getFunctions, httpsCallable } from "firebase/functions";

export default async function sendCustomerToPortal() {
  try {
    const functions = getFunctions();

    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );

    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/app/settings/billing`,
      locale: "auto",
    });
    await functionRef({ returnUrl: window.location.origin });

    const { url } = data as { url: string };

    if (url) {
      window.location.assign(url);
    }
  } catch (error) {
    console.error(error);
  }
}
