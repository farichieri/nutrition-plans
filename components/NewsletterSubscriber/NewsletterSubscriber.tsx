import { emailRegex } from "@/constants";
import { useNewsletterSubscribeMutation } from "@/features/emails/services";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../Loader/Spinner";

interface Props {}

const NewsletterSubscriber: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsletterSubscribe] = useNewsletterSubscribeMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        toast.error("Please enter your email");
        return;
      }

      if (!email.match(emailRegex)) {
        toast.error("Please enter a valid email");
        return;
      }

      const res = await newsletterSubscribe({ email });
      if (!("error" in res)) {
        toast.success("You have been subscribed successfully");
        setEmail("");
      } else {
        throw Error("Error subscribing to newsletter");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex box-shadow-full w-fit flex-col items-center justify-center gap-5 rounded-2xl border border-green-500/50 bg-green-200 px-4 py-8 dark:bg-green-900 ">
      <h2 className="my-0 max-w-2xl py-0 text-center text-3xl font-bold sm:text-4xl">
        🥦 Start receiving the{" "}
        <span className="underline decoration-green-500 decoration-8 underline-offset-2">
          BEST
        </span>{" "}
        tips to succeed in your nutrition every week!
      </h2>
      <form
        className="flex w-full flex-wrap items-center justify-center gap-2"
        onSubmit={handleSubscribe}
      >
        <input
          className="h-11 w-60 rounded-md border border-green-500/40 bg-white p-2.5 text-black outline-none"
          onChange={handleInput}
          placeholder="Type your email..."
          type="email"
          value={email}
          spellCheck={false}
        />
        <button className="round-md flex h-11 w-24 items-center justify-center rounded-lg bg-green-400 text-white duration-300 hover:bg-green-500 active:bg-green-700">
          {loading ? (
            <Spinner customClass="h-6 w-6 stroke-white" />
          ) : (
            <>Subscribe</>
          )}
        </button>
      </form>
    </section>
  );
};

export default NewsletterSubscriber;
