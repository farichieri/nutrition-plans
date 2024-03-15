import { Notification } from "../types";

const getWelcomeNotification = () => {
  const welcomeNotification: Omit<Notification, "id" | "dateCreated"> = {
    body: "We are happy to have you here! Feel free to explore the app and let us know if you have any questions or feedback. You can reach us at hello@nutritionplans.co or by sending us a message through the 'Feedback' button.",
    imageURL: "",
    isVisible: true,
    sender: "Nutrition Plans",
    title: "Welcome to Nutrition Plans!",
    type: "welcome",
    url: "",
  };

  return welcomeNotification;
};

export default getWelcomeNotification;
