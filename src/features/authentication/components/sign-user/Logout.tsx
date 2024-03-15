"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { SubmitButton } from "@/components/Buttons";
import { setProgress } from "@/features/progress";
import { persistor } from "@/lib/store";
import { auth } from "@/services/firebase";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    router.push("/");
    try {
      await signOut(auth);
      dispatch(setProgress({}));
      persistor.purge();
    } catch (error) {
      console.error(error);
    }
    setIsDisabled(false);
    setIsLoading(false);
  };

  return (
    <div className="flex w-24 items-center text-sm">
      <SubmitButton
        className={""}
        onClick={handleLogout}
        content="Logout"
        isLoading={isLoading}
        isDisabled={isDisabled}
        loadMessage={"Loading..."}
      />
    </div>
  );
};

export default Logout;
