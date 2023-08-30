import { api } from "@/services/api";
import { userDocRef } from "@/services/firebase";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { User as FirebaseUser, deleteUser } from "firebase/auth";
import {
  User,
  newAccount,
  setLoginError,
  setUpdateUser,
  setUser,
} from "@/features/authentication";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, { userID: string | undefined }>({
      async queryFn({ userID }, { dispatch }) {
        try {
          console.log("Executing getUser");
          if (!userID) throw new Error("No user logged in.");
          const userRef = userDocRef({ userID });
          const querySnapshot = await getDoc(userRef);
          const userData = querySnapshot.data() as User;
          if (!userData) throw new Error("Error fetching user Data");

          dispatch(setUser(userData));

          return { data: userData };
        } catch (error) {
          dispatch(setLoginError());
          console.log(error);
          return { error };
        }
      },
      providesTags: ["auth"],
    }),

    login: build.mutation<User, { userID: string | undefined }>({
      async queryFn({ userID }, { dispatch }) {
        try {
          console.log("Executing login");
          if (!userID) throw new Error("No user logged in.");
          const userRef = userDocRef({ userID });
          const querySnapshot = await getDoc(userRef);
          const userData = querySnapshot.data() as User;
          if (!userData) throw new Error("Error fetching user Data");

          dispatch(setUser(userData));

          return { data: userData };
        } catch (error) {
          dispatch(setLoginError());
          console.log(error);
          return { error };
        }
      },
      invalidatesTags: ["auth"],
    }),

    updateUser: build.mutation<User, { user: User; fields: Partial<User> }>({
      async queryFn({ user, fields }, { dispatch }) {
        try {
          console.log("Executing updateUser");
          const userRef = userDocRef({ userID: user.id });
          await updateDoc(userRef, fields);

          dispatch(setUpdateUser({ user, fields }));

          return { data: user };
        } catch (error) {
          console.log("updateUser", { error });
          return { error };
        }
      },
      invalidatesTags: ["auth"],
    }),

    postUser: build.mutation<User, { user: FirebaseUser }>({
      async queryFn({ user }, { dispatch }) {
        try {
          console.log("Executing postUser");
          const { uid, email, photoURL, displayName, metadata } = user;
          const userRef = userDocRef({ userID: user.uid });
          const newUser: User = {
            ...newAccount,
            createdAt: metadata.creationTime,
            displayName: displayName || "",
            emailAddress: email,
            imageURL: photoURL,
            id: uid,
          };
          await setDoc(userRef, newUser);
          await fetch("/api/welcome/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailAddress: email,
              displayName: displayName,
            }),
          });
          dispatch(setUser(newUser));

          return { data: newUser };
        } catch (error) {
          try {
            await deleteUser(user);
            console.log("User deleted");
          } catch (error) {
            console.log("Error deleting user");
          }
          return { error: error };
        }
      },
      invalidatesTags: ["auth"],
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useGetUserQuery,
  useLoginMutation,
  usePostUserMutation,
  useUpdateUserMutation,
} = authApi;
