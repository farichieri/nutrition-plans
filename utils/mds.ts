import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { PlansType, Posts } from "@/types";

export enum MDDirectories {
  plans = "/data/content/plans",
  posts = "/data/content/posts",
  legal = "/data/content/legal",
}

const getSortedData = (directory: MDDirectories): Posts | PlansType => {
  const dir = path.join(process.cwd(), directory);

  const filesNames = fs.readdirSync(dir);
  const allPostsData = filesNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
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
      summary: matterResult.data.summary,
      timeReading,
      title: matterResult.data.title,
      topic: matterResult.data.topic,
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

const getAllMDIDS = (directory: MDDirectories) => {
  const dir = path.join(process.cwd(), directory);
  const fileNames = fs.readdirSync(dir);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

const getAllMDData = async (directory: MDDirectories, id: any) => {
  const dir = path.join(process.cwd(), directory);

  const fullPath = path.join(dir, `${id}.md`);
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

export { getSortedData, getAllMDData, getAllMDIDS };
