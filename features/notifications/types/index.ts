export interface Notification {
  body: string;
  id: string;
  imageURL: string;
  sender: string;
  title: string;
  url: string;
}

export interface NotificationsGroup {
  [key: string]: Notification;
}
