import { getAuth, getIdTokenResult } from "firebase/auth";

export default async function isUserPremium(): Promise<boolean> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return false;

  const decodedToken = await getIdTokenResult(user);

  console.log({ decodedToken });

  return decodedToken?.claims?.stripeRole === "premium" ? true : false;
}
