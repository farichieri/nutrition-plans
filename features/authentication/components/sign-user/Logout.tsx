import { auth } from "@/services/firebase";
import { persistor } from "@/store";
import { setProgress } from "@/features/progress";
import { signOut } from "firebase/auth";
import { SubmitButton } from "@/components/Buttons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
