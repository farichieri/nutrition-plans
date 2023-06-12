import {
  setIsCreatingUser,
  createNewUser,
  setIsSigningUser,
  generateUserObject,
  setUser,
  AUTH_ERRORS,
  setLoginError,
} from "@/features/authentication";
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/services/firebase/firebase.config";
import { DevTool } from "@hookform/devtools";
import { GoogleLoginButton, SubmitButton } from "@/components/Buttons";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, control, formState } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const [errorMessage, setErrorMessage] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);

  const handleLogInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additinalInfo = getAdditionalUserInfo(result);
        if (additinalInfo?.isNewUser) {
          const user = result.user;
          dispatch(setIsCreatingUser(true));
          const res = await createNewUser(user);
          if (res.result === "success") {
            dispatch(setIsCreatingUser(false));
          }
        } else {
          dispatch(setIsSigningUser(true));
          const userRes = await generateUserObject(result.user);
          if (userRes.result === "success") {
            dispatch(setUser(userRes.data));
          } else {
            throw new Error("Not userRes found");
          }
        }
      })
      .catch((error) => {
        dispatch(setLoginError());
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
      });
  };

  const onSubmit = async (data: FormValues) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          dispatch(setIsSigningUser(true));
          const userRes =
            result.user && (await generateUserObject(result.user));
          if (userRes.result === "success") {
            dispatch(setUser(userRes.data));
          } else {
            throw new Error("Not userRes found");
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(AUTH_ERRORS[errorCode]);
        dispatch(setIsSigningUser(false));
      });
  };

  return (
    <>
      <DevTool control={control} />
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
              noValidate
              className="relative flex flex-col items-center rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col">
                  <input
                    className="rounded-md border border-gray-500/50 bg-transparent px-2 py-2.5 outline-none focus-within:border-black focus:bg-[var(--box-shadow)] dark:focus-within:border-white"
                    placeholder="Email Address"
                    type="email"
                    {...register("email")}
                    onChange={() => setErrorMessage("")}
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
                    onChange={() => setErrorMessage("")}
                  />
                  <div className="text-red-500">
                    <p>{errors.password?.message}</p>
                  </div>
                </div>
              </div>
              <SubmitButton
                type="submit"
                className={"h-11 w-full text-lg"}
                loadMessage={"Logging in..."}
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
          </div>
        )}
        {errorMessage && (
          <span className="w-full text-center text-red-600">
            {errorMessage}
          </span>
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
    </>
  );
};

export default Login;
