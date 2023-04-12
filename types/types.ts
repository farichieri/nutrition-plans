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

export interface Account {
  email: string;
  is_premium: boolean;
  name: string;
  premium_plan: string | null;
}
