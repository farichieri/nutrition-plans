import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.config";
import { createNewUser } from "@/firebase/helpers/Auth";
import { setIsCreatingUser, setIsSigningUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import GoogleLoginButton from "../Buttons/GoogleLogin";
import Link from "next/link";
import Submit from "../Buttons/SubmitButton";
import { AUTH_ERRORS } from "@/firebase/errors";

const Signup = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const [redirectRoute, setRedirectRoute] = useState(
    router.asPath === "/app/billing" ? "/app/billing" : "/app"
  );

  const handleLogInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additinalInfo = getAdditionalUserInfo(result);
        dispatch(setIsSigningUser(true));
        if (additinalInfo?.isNewUser) {
          const user = result.user;
          dispatch(setIsCreatingUser(true));
          await createNewUser(user);
          dispatch(setIsCreatingUser(false));
        }
      })
      .then(() => router.push(redirectRoute))
      .catch((error) => {
        dispatch(setIsCreatingUser(false));
        dispatch(setIsSigningUser(false));
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.email || !input.password || !input.displayName) {
      setErrorMessage("Name, email and password required");
      return;
    }
    setIsLoadingForm(true);
    setIsDisabled(true);
    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, {
          displayName: input.displayName,
        });
        const additinalInfo = getAdditionalUserInfo(result);
        if (additinalInfo?.isNewUser) {
          dispatch(setIsCreatingUser(true));
          await createNewUser(user);
          dispatch(setIsCreatingUser(false));
        }
      })
      .then(() => router.push(redirectRoute))
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
        setIsLoadingForm(false);
        setIsDisabled(false);
        dispatch(setIsCreatingUser(false));
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrorMessage("");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Sign up</h1>
        <p>Create your Nutrition Plans account</p>
      </div>
      <GoogleLoginButton onClick={handleLogInWithGoogle}>
        Sign up with Google
      </GoogleLoginButton>
      <div className="flex items-center py-4">
        <div className="h-px flex-grow bg-gray-400"></div>
        <span className="px-4 text-sm font-light opacity-50">
          Or continue with
        </span>
        <div className="h-px flex-grow bg-gray-400"></div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative flex w-full flex-col items-center gap-6 rounded-3xl border p-4 shadow-lg dark:border-cyan-300/10 dark:shadow-cyan-300/20"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-2">
            <input
              onChange={handleChange}
              name="displayName"
              value={input.displayName}
              placeholder="Full Name"
              type="text"
              required
              className="w-full border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
            />
            <input
              onChange={handleChange}
              name="email"
              value={input.email}
              placeholder="Email address"
              type="text"
              required
              className="w-full border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
            />
            <input
              onChange={handleChange}
              name="password"
              value={input.password}
              placeholder="Password"
              type="password"
              required
              className="w-full border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
            />
          </div>
          <Submit
            className={""}
            onClick={handleSubmit}
            loadMessage={"Signing up..."}
            content="Sign up"
            isLoading={isLoadingForm}
            isDisabled={isDisabled}
          />
        </form>
        {errorMessage && (
          <span className="w-full text-center text-red-500">
            {errorMessage}
          </span>
        )}
        <div className="flex flex-col gap-2">
          <span className="text-xs opacity-50 sm:text-sm ">
            By signing up, you agree to the{" "}
            <Link href={"/terms"} className="hover:underline">
              Terms of Service.
            </Link>
          </span>
          <span className="text-xs opacity-50 sm:text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline ">
              Log in here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
