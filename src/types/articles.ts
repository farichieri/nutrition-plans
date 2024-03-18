export interface ArticlePlan {
  metadata: Metadata;
  slug: string;
  content: string;
}

export interface Metadata {
  date: string;
  description: string;
  image: string;
  imageURL: string;
  isAvailable?: string;
  mainTopic?: string;
  title: string;
  URL: string;
}

export interface ArticlePost {
  metadata: Metadata;
  slug: string;
  content: string;
}
