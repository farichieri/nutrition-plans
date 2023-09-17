import { addDoc, serverTimestamp } from "firebase/firestore";
import { api } from "@/services/api";
import { newsletterEmailsCollection } from "@/services/firebase";

export const emailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    newsletterSubscribe: build.mutation<{ email: string }, { email: string }>({
      queryFn: async ({ email }) => {
        console.log("Executing newsletterSubscribe");
        try {
          const timestamp = serverTimestamp();

          const postRes = await addDoc(newsletterEmailsCollection, {
            email: email,
            createdAt: timestamp,
          });

          console.log({ postRes });

          // If not, add email to newsletter collection
          return { data: { email } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["emails"],
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const { useNewsletterSubscribeMutation } = emailsApi;
