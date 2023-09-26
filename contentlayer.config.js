import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  timeReading: {
    type: "number",
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  headings: {
    type: "list",
    of: {
      type: "object",
      properties: {
        level: { type: "number" },
        title: { type: "string" },
        slug: { type: "string" },
      },
    },
    resolve: (doc) => {
      const headings = [];
      doc.body.raw.replace(/^(#+)\s+(.*)$/gm, (match, level, title) => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        headings.push({ level: level.length, title, slug });
      });
      return headings;
    },
  },
};

export const Plan = defineDocumentType(() => ({
  name: "Plan",
  filePathPattern: `plans/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    imageURL: {
      type: "string",
      required: true,
    },
    URL: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    keywords: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    isAvailable: {
      type: "boolean",
      required: true,
    },
    // TODO: add more fields
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    imageURL: {
      type: "string",
      required: true,
    },
    URL: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    keywords: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    topic: {
      type: "string",
      required: true,
    },
    // TODO: add more fields
  },
  computedFields,
}));

export const Legal = defineDocumentType(() => ({
  name: "Legal",
  filePathPattern: `legal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    // "dev": "contentlayer dev & next dev",

    // TODO: add more fields
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "data/content",
  documentTypes: [Plan, Post, Legal],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: true,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

// "dev": "contentlayer dev & next dev",
