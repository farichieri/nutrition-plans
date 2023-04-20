import React, { useState } from "react";
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.config";
import { createNewUser } from "@/firebase/helpers/Auth";
import { setIsCreatingUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import GoogleLoginButton from "../Buttons/GoogleLogin";
import Link from "next/link";
import SubmitButton from "../Buttons/SubmitButton";

const Login = () => {
  const dispatch = useDispatch();
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
  const createProfileRoute = "/app/create";

  const handleLogInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additinalInfo = getAdditionalUserInfo(result);
        if (additinalInfo?.isNewUser) {
          const user = result.user;
          dispatch(setIsCreatingUser(true));
          const res = await createNewUser(user);
          if (!res?.error) {
            router.push(createProfileRoute);
          }
        } else {
          router.push(redirectRoute);
        }
      })
      .then(() => dispatch(setIsCreatingUser(false)))
      .catch((error) => {
        dispatch(setIsCreatingUser(false));
        alert(error.message);
        console.log({ error });
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.email || !input.password) {
      setErrorMessage("Email and password required");
      return;
    }
    setIsLoadingForm(true);
    setIsDisabled(true);
    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then((result) => {
        const user = result.user;
        console.log({ user });
        user && router.push(redirectRoute);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    setIsLoadingForm(false);
    setIsDisabled(false);
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
    <div className="m-auto flex w-full max-w-sm flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p>Login to continue achieving your nutrition goals</p>
      </div>
      <GoogleLoginButton onClick={handleLogInWithGoogle}>
        Log in with Google
      </GoogleLoginButton>
      <div className="flex items-center py-4">
        <div className="h-px flex-grow bg-gray-400"></div>
        <span className="px-4 text-sm font-light opacity-50">
          Or continue with
        </span>
        <div className="h-px flex-grow bg-gray-400"></div>
      </div>
      <form
        className="relative flex flex-col items-center gap-6 rounded-3xl border p-4 shadow-lg dark:border-cyan-300/10 dark:shadow-cyan-300/20"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-2">
          <input
            onChange={handleChange}
            name="email"
            value={input.email}
            placeholder="Email address"
            type="email"
            required
            className="border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
          />
          <input
            onChange={handleChange}
            name="password"
            value={input.password}
            placeholder="Password"
            type="password"
            required
            className="border-b border-gray-300 bg-transparent px-4 py-1 outline-none focus:bg-[var(--box-shadow)]"
          />
        </div>
        <SubmitButton
          className={""}
          onClick={handleSubmit}
          loadMessage={"Logging in..."}
          content="Log in"
          isLoading={isLoadingForm}
          isDisabled={isDisabled}
        />
        {errorMessage && (
          <span className="absolute -bottom-8 w-full text-center text-red-500">
            {errorMessage}
          </span>
        )}
      </form>
      <span className="text-xs opacity-50 sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-400 hover:underline">
          Sign up here
        </Link>
      </span>
    </div>
  );
};

export default Login;
