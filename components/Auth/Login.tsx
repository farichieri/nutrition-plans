import React, { useState } from "react";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.config";
import { useRouter } from "next/router";
import GoogleLoginButton from "../Buttons/GoogleLogin";
import Link from "next/link";
import Submit from "../Buttons/Submit";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleLogInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const additinalInfo = getAdditionalUserInfo(result);
        if (additinalInfo?.isNewUser) {
          router.push("/app");
        } else {
          router.push("/app");
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoadingForm(true);
    setIsDisabled(true);
    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then((result) => {
        const user = result.user;
        user && router.push("/app");
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
    <div className="flex w-full max-w-sm flex-col gap-8">
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
            placeholder="Email"
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
        <Submit
          style={null}
          onClick={handleSubmit}
          loadMessage={"Logging in..."}
          content="Log in"
          isLoading={isLoadingForm}
          isDisabled={isDisabled}
        />
        {errorMessage && (
          <span className="absolute -bottom-8 w-full text-center text-red-500">
            Incorrect email or password.
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
