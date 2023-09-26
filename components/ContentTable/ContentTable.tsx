import { FC } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

interface Props {
  headings: { level: number; title: string; slug: string }[];
}
const ContentTable: FC<Props> = ({ headings }) => {
  return (
    <nav className="flex flex-col gap-4 rounded-lg px-2">
      <span>Table of content</span>
      {headings.length > 0 && (
        <ul className="m-0 flex flex-col gap-2 p-0">
          {headings.map(
            (heading: { level: number; title: string; slug: string }) => (
              <li className="m-0 p-0" key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className="text-base font-medium opacity-50 duration-300 hover:opacity-100"
                >
                  {heading.title}
                </a>
              </li>
            )
          )}
        </ul>
      )}
      <a
        href="# "
        className=" hidden items-center gap-2 text-base font-medium opacity-50 duration-300 hover:opacity-100 lg:flex"
      >
        Back to top
        <span className="flex h-6 w-6 items-center justify-center rounded-full border ">
          <BiUpArrowAlt className="inline-block rounded-full" />
        </span>
      </a>
    </nav>
  );
};

export default ContentTable;
