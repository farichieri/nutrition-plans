import { auth } from "@/firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SecondaryButton from "../Buttons/Submit";
import { useDispatch } from "react-redux";
import { setLogoutUser } from "@/store/slices/authSlice";

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
    await signOut(auth)
      .then(() => dispatch(setLogoutUser()))
      .catch((error) => {
        console.error(error);
      });
    setIsDisabled(false);
    setIsLoading(false);
  };

  return (
    <div className="flex w-24 items-center text-sm">
      <SecondaryButton
        style={null}
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
