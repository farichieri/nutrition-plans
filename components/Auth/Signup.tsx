import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.config";
import { useRouter } from "next/router";
import GoogleLoginButton from "../Buttons/GoogleLogin";
import Link from "next/link";
import Submit from "../Buttons/Submit";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const redirectRoute =
    router.asPath === "/app/billing" ? "/app/billing" : "/app";

  const handleLogInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additinalInfo = getAdditionalUserInfo(result);
        if (additinalInfo?.isNewUser) {
          console.log({ additinalInfo });
          console.log(result.user);
          router.push(redirectRoute);
        } else {
          router.push(redirectRoute);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsLoadingForm(true);
      setIsDisabled(true);
      await createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((result) => {
          const user = result.user;
          user && router.push(redirectRoute);
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(error.message);
        });
      setIsLoadingForm(false);
      setIsDisabled(false);
    } catch (error) {
      console.log(error);
    }
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
        <h1 className="text-lg font-bold">Sign up</h1>
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
      <form
        className="relative flex w-full flex-col items-center gap-6 rounded-3xl border p-4 shadow-lg dark:border-cyan-300/10 dark:shadow-cyan-300/20"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-2">
          <input
            onChange={handleChange}
            name="email"
            value={input.email}
            placeholder="Email address"
            type="text"
            className="w-full border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
          />
          <input
            onChange={handleChange}
            name="password"
            value={input.password}
            placeholder="Password"
            type="password"
            className="w-full border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
          />
        </div>
        <Submit
          style={null}
          onClick={handleSubmit}
          loadMessage={"Signing up..."}
          content="Sign up"
          isLoading={isLoadingForm}
          isDisabled={isDisabled}
        />
        {errorMessage && (
          <span className="absolute -bottom-8 w-full text-center text-red-500">
            Unexpected error.
          </span>
        )}
      </form>
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
  );
};

export default Signup;
