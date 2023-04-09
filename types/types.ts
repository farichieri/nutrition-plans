export enum Theme {
  dark = "dark",
  light = "light",
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  topic: string;
  authorName: string;
  contentHtml: string;
}

export interface Posts extends Array<Post> {}
