// import { getAuth } from "firebase/auth";

import { auth } from "@/services/firebase";

export default async function isUserPremium(): Promise<boolean> {
  // const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return false;

  // it is necessary to refresh token before getting the claims
  const decodedToken = await user.getIdTokenResult(true);

  return decodedToken?.claims?.stripeRole === "premium" ? true : false;
}
