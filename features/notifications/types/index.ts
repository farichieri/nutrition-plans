export interface Notification {
  body: string;
  id: string;
  imageURL: string;
  sender: string;
  title: string;
  url: string;
  dateCreated: string;
  type: "welcome" | "info" | "error" | "success";
  isVisible: boolean;
}

export interface NotificationsGroup {
  [key: string]: Notification;
}
