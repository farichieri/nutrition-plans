import { remark } from "remark";
import fs from "fs";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";

const postDirectory = path.join(process.cwd(), "/posts");

const getSortedPostData = () => {
  const filesNames = fs.readdirSync(postDirectory);
  const allPostsData = filesNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
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

const getAllPostsIds = () => {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

const getPostData = async (id: any) => {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const topic = matterResult.data.topic;

  return {
    id,
    contentHtml,
    topic,
    ...matterResult.data,
  };
};

export { getSortedPostData, getPostData, getAllPostsIds };
