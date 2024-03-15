import Image, { ImageProps } from "next/image";
import * as React from "react";

import { cn } from "@/utils/cn";
// import Link from "next/link";
// import { Callout } from "@/components/callout"
// import { MdxCard } from "@/components/mdx-card"

// const CustomLink = (props: any) => {
//   const href = props.href;

//   if (href.startsWith("/")) {
//     return (
//       <Link href={href} {...props}>
//         {props.children}
//       </Link>
//     );
//   }

//   if (href.startsWith("#")) {
//     return (
//       <a className="" {...props}>
//         {}
//       </a>
//     );
//   }

//   return (
//     <a target="_blank" rel="noopener noreferrer" {...props}>
//       {}
//     </a>
//   );
// };

const components = {
  h1: ({ className, ...props }: { className: string }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    >
      {}
    </h1>
  ),
  h2: ({ className, ...props }: { className: string }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-4xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {}
    </h2>
  ),
  h3: ({ className, ...props }: { className: string }) => (
    <h3
      className={cn(
        "mt-10 scroll-m-20 text-3xl font-semibold tracking-tight ",
        className
      )}
      {...props}
    >
      {}
    </h3>
  ),
  h4: ({ className, ...props }: { className: string }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {}
    </h4>
  ),
  h5: ({ className, ...props }: { className: string }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {}
    </h5>
  ),
  h6: ({ className, ...props }: { className: string }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {}
    </h6>
  ),
  a: ({ className, ...props }: { className: string }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    >
      {}
    </a>
  ),
  // a: CustomLink,
  p: ({ className, ...props }: { className: string }) => (
    <p
      className={cn("text-lg leading-7 [&:not(:first-child)]:mt-5", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: { className: string }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: { className: string }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: { className: string }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: { className: string }) => (
    <blockquote
      className={cn(
        "[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: { className: string }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: { className: string }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: { className: string }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: { className: string }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image: (props: ImageProps) => (
    <Image className={cn("rounded-md border")} {...props} alt={props.alt} />
  ),
  // Callout,
  // Card: MdxCard,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  // const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      {/* @ts-ignore */}
      {/* <Component components={components} /> */}
    </div>
  );
}
