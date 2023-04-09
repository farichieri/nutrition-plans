"use client";

import React, { useState } from "react";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import GoogleLoginButton from "./Buttons/GoogleLogin";
import SecondaryButton from "./Buttons/Seoncary";
import { auth, provider } from "../firebase/firebase.config";

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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
    <div className="login">
      <GoogleLoginButton onClick={handleLogInWithGoogle}>
        Sign in with Google
      </GoogleLoginButton>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          <input
            onChange={handleChange}
            name="email"
            value={input.email}
            placeholder="Email"
            type="text"
          />
          <input
            onChange={handleChange}
            name="password"
            value={input.password}
            placeholder="Password"
            type="password"
          />
        </div>
        <SecondaryButton
          style={null}
          onClick={handleSubmit}
          loadMessage={"Ingresando..."}
          content="Sign in"
          isLoading={isLoadingForm}
          isDisabled={isDisabled}
        />
        {errorMessage && <span>Email o contraseña inválidos</span>}
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          max-width: 300px;
          width: 100%;
          position: relative;
          align-items: center;
          margin-top: 2rem;
        }
        .inputs-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 1rem 0;
        }
        input {
          border: none;
          border-bottom: 1px solid lightgray;
          background: none;
          outline: none;
          color: var(--text-color);
          padding: 0.3rem 1rem;
          margin: 0.5rem 0;
          transition: 0.3s;
        }
        input:focus {
          background: var(--box-shadow);
        }
        button {
          cursor: pointer;
        }
        span {
          color: red;
          position: absolute;
          bottom: -2rem;
          width: 100%;
          text-align: center;
        }
        input:autofill {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Login;
