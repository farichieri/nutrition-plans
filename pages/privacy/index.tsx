import LandingLayout from "@/layouts/LandingLayout";
import { MDDirectories, getAllMDData } from "@/utils/mds";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function Page({ data }: { data: any }) {
  return (
    <LandingLayout>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 py-24">
        <span className="text-5xl font-bold">Terms of privacy</span>
        <ReactMarkdown
          className="pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            li: (props) => (
              <li
                className=" before:absolute before:-ml-4 before:inline-block before:text-gray-500 before:content-['–']"
                {...props}
              />
            ),
            p: (props) => <p className="m-0 py-1" {...props} />,
            h3: (props) => <h3 className="mt-10 " {...props} />,
          }}
        >
          {data.content}
        </ReactMarkdown>
      </div>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllMDData(MDDirectories.legal, "privacy");
  return {
    props: {
      data,
    },
  };
};
