import {
  createNewUser,
  setIsCreatingUser,
  setIsSigningUser,
  AUTH_ERRORS,
} from "@/features/authentication";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../../services/firebase/firebase.config";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import GoogleLoginButton from "../../../components/Buttons/GoogleLogin";
import Link from "next/link";
import React, { useState } from "react";
import SubmitButton from "../../../components/Buttons/SubmitButton";

const Signup = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [nameAdded, setNameAdded] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
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
          console.log({ user });
          await updateProfile(user, {
            displayName: input.displayName,
          });
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

  const handleContinue = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.displayName) {
      setNameAdded(true);
    }
  };

  return (
    <div className="m-auto flex w-full max-w-sm select-none flex-col items-center justify-center gap-4 rounded-md p-4 py-10 sm:border sm:px-10">
      <div>
        <h1 className="text-center text-4xl font-bold">
          Create Your Nutrition&nbsp;Plans Account
        </h1>
      </div>
      {!nameAdded && (
        <form onSubmit={handleContinue} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="displayName" className="text-xs opacity-60">
              Your Name
            </label>
            <input
              onChange={handleChange}
              name="displayName"
              value={input.displayName}
              placeholder="Your Name"
              type="text"
              autoFocus
              required
              className="rounded-md border border-gray-500/50 bg-transparent p-2 outline-none placeholder:text-sm focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
            />
          </div>
          <SubmitButton
            className={"h-10 w-full text-base"}
            onSubmit={handleContinue}
            loadMessage={"Logging in..."}
            content={`Continue`}
            isLoading={isLoadingForm}
            isDisabled={isDisabled}
            type="submit"
          />
          <div className="pt-1 text-center text-sm">
            <span>Already have an Account? </span>
            <Link href={"/login"} className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      )}
      {nameAdded && (
        <>
          {!emailOpen && (
            <GoogleLoginButton onClick={handleLogInWithGoogle}>
              Continue with Google
            </GoogleLoginButton>
          )}
          {!emailOpen && (
            <div className="flex w-full items-center justify-center border-t pt-4">
              <button
                onClick={() => setEmailOpen(true)}
                className="flex cursor-pointer items-center gap-0.5 border-b border-transparent text-blue-500 hover:border-blue-500"
              >
                <span className="">Continue with Email</span>
                <span className="material-icons-outlined md-14 ">
                  trending_flat
                </span>
              </button>
            </div>
          )}
          {emailOpen && (
            <>
              <div className="flex w-full flex-col gap-2">
                <form
                  className="relative flex flex-col items-center gap-3 rounded-md"
                  onSubmit={handleSubmit}
                >
                  <div className="flex w-full flex-col gap-2">
                    <input
                      onChange={handleChange}
                      name="email"
                      value={input.email}
                      placeholder="Email address"
                      type="text"
                      required
                      className="rounded-md border border-gray-500/50 bg-transparent p-2 outline-none focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                    />
                    <input
                      onChange={handleChange}
                      name="password"
                      value={input.password}
                      placeholder="Password"
                      type="password"
                      required
                      className="rounded-md border border-gray-500/50 bg-transparent p-2 outline-none focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                    />
                  </div>
                  <SubmitButton
                    className={"h-12 w-full text-base"}
                    onClick={handleSubmit}
                    loadMessage={"Creating account..."}
                    content={`Continue with Email`}
                    isLoading={isLoadingForm}
                    isDisabled={isDisabled}
                    icon={
                      <span className="material-icons-outlined md-24 pr-2">
                        email
                      </span>
                    }
                  />
                </form>
                {errorMessage && (
                  <span className="w-full text-center text-red-600">
                    {errorMessage}
                  </span>
                )}
              </div>
              {emailOpen && (
                <div className="tems-center flex w-full justify-center ">
                  <button
                    onClick={() => setEmailOpen(false)}
                    className="flex cursor-pointer items-center gap-0.5 border-b border-transparent text-blue-500 hover:border-blue-500"
                  >
                    <span className="material-icons-outlined md-14 -rotate-180 transform">
                      trending_flat
                    </span>
                    <span className="">Other login options</span>
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Signup;
