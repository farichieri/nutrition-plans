import Login from "@/components/Login";
import { auth } from "@/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    console.log("Verifying User");
    onAuthStateChanged(auth, async (user) => {
      console.log({ user });
      if (user) {
        router.push("/app");
      }
    });
  }, []);

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <Login />
    </section>
  );
}
