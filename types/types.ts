export enum Theme {
  dark = "dark",
  light = "light",
}

export interface Post {
  author: string;
  authorName: string;
  contentHtml: string;
  date: string;
  id: string;
  summary: string;
  title: string;
  topic: string;
}

export interface Posts extends Array<Post> {}

export interface PlanType {
  contentHtml: string;
  id: string;
  title: string;
}

export interface PlansType extends Array<PlanType> {}

export interface UserAccount {
  created_at: string | undefined;
  display_name: string;
  email_address: string | null;
  gender: string | null;
  height: string | null;
  is_premium: boolean;
  lang: string;
  photo_url: string | null;
  premium_plan: string | null;
  user_id: string;
  weight_goal: string | null;
  weight: string | null;
}
