import { remark } from "remark";
import fs from "fs";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

export const directories = {
  postsDirectory: path.join(process.cwd(), "/content/posts"),
  plansDirectory: path.join(process.cwd(), "/content/plans"),
};
// Add reading time (installed)
// https://mateonunez.dev/blog/hello-blog
const getSortedData = (directory: string) => {
  const filesNames = fs.readdirSync(directory);
  const allPostsData = filesNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const timeReading = readingTime(fileContents).text;
    return {
      id,
      timeReading,
      ...matterResult.data,
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

const getAllMDIDS = (directory: string) => {
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

const getAllMDData = async (directory: string, id: any) => {
  const fullPath = path.join(directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const timeReading = readingTime(fileContents).text;
  const matterResult = matter(fileContents);
  const { data, content } = matter(fileContents);

  console.log({ data });
  console.log({ content });

  // const processedContent = await remark()
  //   .use(html)
  //   .use(remarkGfm)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString();

  return {
    timeReading,
    id,
    content,
    ...data,
  };

  // return {
  //   timeReading,
  //   id,
  //   contentHtml,
  //   ...matterResult.data,
  // };
};

export { getSortedData, getAllMDData, getAllMDIDS };
