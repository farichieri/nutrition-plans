import {
  createNewUser,
  setIsCreatingUser,
  setIsSigningUser,
  AUTH_ERRORS,
  setLoginError,
} from "@/features/authentication";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../../services/firebase/firebase.config";
import { DevTool } from "@hookform/devtools";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleLoginButton from "../../../components/Buttons/GoogleLogin";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import SubmitButton from "../../../components/Buttons/SubmitButton";

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  displayName: yup.string().required("Please enter your name"),
});

type FormValues = {
  email: string;
  password: string;
  displayName: string;
};

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState,
    control,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", displayName: "" },
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const [nameAdded, setNameAdded] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectRoute, setRedirectRoute] = useState(
    router.asPath === "/app/billing" ? "/app/billing" : "/app"
  );

  const handleLogInWithGoogle = async (data: FormValues) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additinalInfo = getAdditionalUserInfo(result);
        dispatch(setIsSigningUser(true));
        if (additinalInfo?.isNewUser) {
          const user = result.user;
          await updateProfile(user, {
            displayName: data.displayName,
          });
          dispatch(setIsCreatingUser(true));
          await createNewUser(user);
          dispatch(setIsCreatingUser(false));
        }
      })
      .then(() => router.push(redirectRoute))
      .catch((error) => {
        dispatch(setLoginError());
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
      });
  };

  const onSubmit = async (data: FormValues) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, {
          displayName: data.displayName,
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
        setLoginError();
        dispatch(setIsCreatingUser(false));
      });
  };

  const handleContinue = (event: FormEvent) => {
    event.preventDefault();
    const values = getValues();
    if (values.displayName) {
      setNameAdded(true);
    } else {
      setError("displayName", {
        message: "Please enter your Name",
      });
    }
  };

  return (
    <div className="m-auto flex w-full max-w-sm select-none flex-col items-center justify-center gap-4 rounded-md p-4 py-10 sm:border sm:px-10">
      <DevTool control={control} />

      <div>
        <h1 className="text-center text-4xl font-bold">
          Create Your Nutrition&nbsp;Plans Account
        </h1>
      </div>
      {!nameAdded && (
        <form
          noValidate
          onSubmit={handleContinue}
          className="flex w-full flex-col gap-0"
        >
          <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="displayName" className="text-xs opacity-60">
              Your Name
            </label>
            <div className="flex w-full flex-col">
              <input
                className="rounded-md border border-gray-500/50 bg-transparent p-2 outline-none placeholder:text-sm focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                placeholder="Your Name"
                type="text"
                {...register("displayName")}
                onChange={() => clearErrors("displayName")}
              />
              <div className="text-red-500">
                <p>{errors.displayName?.message}</p>
              </div>
            </div>
          </div>
          <SubmitButton
            className={"h-10 w-full text-base"}
            loadMessage={"Logging in..."}
            content={`Continue`}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            type="submit"
          />
          <div className="mt-4 pt-1 text-center text-sm">
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
            <GoogleLoginButton onClick={handleSubmit(handleLogInWithGoogle)}>
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
              <div className="flex w-full flex-col gap-3">
                <form
                  noValidate
                  className="relative flex flex-col items-center gap-0 rounded-md"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex w-full flex-col">
                    <div className="flex w-full flex-col">
                      <input
                        className="rounded-md border border-gray-500/50 bg-transparent px-2 py-2.5 outline-none focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                        placeholder="Email Address"
                        type="email"
                        {...register("email")}
                      />
                      <div className="text-red-500">
                        <p>{errors.email?.message}</p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col">
                      <input
                        className="rounded-md border border-gray-500/50 bg-transparent px-2 py-2.5 outline-none focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                        placeholder="Password"
                        type="password"
                        {...register("password")}
                      />
                      <div className="text-red-500">
                        <p>{errors.password?.message}</p>
                      </div>
                    </div>
                  </div>
                  <SubmitButton
                    className={"h-12 w-full text-base"}
                    loadMessage={"Creating account..."}
                    content={`Continue with Email`}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
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
                    <span className="">Other signup options</span>
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
