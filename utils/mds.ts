import { PlansType, Posts } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

export enum MDDirectories {
  plans = "/data/content/plans",
  posts = "/data/content/posts",
  legal = "/data/content/legal",
}

const getSortedData = (directory: MDDirectories): Posts | PlansType => {
  const dir = path.join(process.cwd(), directory);

  const filesNames = fs.readdirSync(dir);
  const allPostsData = filesNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const timeReading = readingTime(fileContents).text;

    return {
      author: matterResult.data.author,
      authorName: matterResult.data.authorName,
      content: matterResult.content,
      date: matterResult.data.date,
      description: matterResult.data.description,
      id,
      image: matterResult.data.image,
      imageURL: matterResult.data.imageURL,
      isAvailable: matterResult.data.isAvailable,
      keywords: matterResult.data.keywords,
      timeReading,
      title: matterResult.data.title,
      topic: matterResult.data.topic,
      URL: matterResult.data.URL,
    };
  });

  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

const getAllMdIds = (directory: MDDirectories) => {
  const dir = path.join(process.cwd(), directory);
  const fileNames = fs.readdirSync(dir);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
};

const getAllMDData = async (directory: MDDirectories, id: any) => {
  const dir = path.join(process.cwd(), directory);

  const fullPath = path.join(dir, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const timeReading = readingTime(fileContents).text;
  const { data, content } = matter(fileContents);

  return {
    timeReading,
    id,
    content,
    ...data,
  };
};

export { getSortedData, getAllMDData, getAllMdIds };
