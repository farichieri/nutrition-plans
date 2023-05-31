import {
  setIsCreatingUser,
  createNewUser,
  setIsSigningUser,
  generateUserObject,
  setUser,
  AUTH_ERRORS,
} from "@/features/authentication";
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../../services/firebase/firebase.config";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleLoginButton from "../../../components/Buttons/GoogleLogin";
import SubmitButton from "../../../components/Buttons/SubmitButton";

const Login = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);
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
          if (res.result === "error") {
            router.push(createProfileRoute);
          }
        } else {
          dispatch(setIsSigningUser(true));
          const userRes =
            result.user && (await generateUserObject(result.user));
          if (userRes.result === "success") {
            dispatch(setUser(userRes.data));
            router.push(redirectRoute);
          }
        }
      })
      .then(() => dispatch(setIsCreatingUser(false)))
      .catch((error) => {
        dispatch(setIsCreatingUser(false));
        dispatch(setIsSigningUser(true));
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
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
        if (user) {
          dispatch(setIsSigningUser(true));
          router.push(redirectRoute);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
        dispatch(setIsSigningUser(false));
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
    <div className="m-auto flex w-full max-w-sm select-none flex-col items-center justify-center gap-4 rounded-md p-4 py-10 sm:px-10">
      <div>
        <h1 className="mb-4 text-center text-4xl font-bold">
          Log in to Nutrition&nbsp;Plans
        </h1>
      </div>
      {!emailOpen && (
        <GoogleLoginButton onClick={handleLogInWithGoogle}>
          Continue with Google
        </GoogleLoginButton>
      )}
      {!emailOpen && (
        <div className="mt-4 flex w-full items-center justify-center border-t pt-4">
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
        <div className="flex w-full flex-col gap-3">
          <form
            className="relative flex flex-col items-center gap-3 rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-2">
              <input
                onChange={handleChange}
                name="email"
                value={input.email}
                placeholder="Email Address"
                type="email"
                required
                autoFocus
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
              type="submit"
              className={"h-11 w-full text-lg"}
              onSubmit={handleSubmit}
              loadMessage={"Logging in..."}
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
        </div>
      )}
      {errorMessage && (
        <span className="w-full text-center text-red-600">{errorMessage}</span>
      )}
      {emailOpen && (
        <div className="tems-center flex w-full justify-center">
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
    </div>
  );
};

export default Login;
