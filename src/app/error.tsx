"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PrimaryButton } from "@/components/Buttons";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const reset = () => {
    router.refresh();
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="m-auto flex flex-col items-center gap-3">
        <h2>Something went wrong!</h2>
        <PrimaryButton onClick={() => reset()} content="Try again" />
      </div>
    </div>
  );
}
