// https://github.com/shadcn-ui/taxonomy
import * as React from "react";

import { TableOfContents } from "@/lib/toc";
import { useMounted } from "@/hooks";
import { cn } from "@/utils/cn";
import { BiUpArrowAlt } from "react-icons/bi";

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items) {
    return null;
  }

  return mounted ? (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">On This Page</span>
      <Tree tree={toc} activeItem={activeHeading} />
      <a
        href="# "
        className="mt-2 hidden items-center gap-2 text-base font-medium opacity-50 duration-300 hover:opacity-100 lg:flex"
      >
        Back to top
        <span className="flex h-6 w-6 items-center justify-center rounded-full border ">
          <BiUpArrowAlt className="inline-block rounded-full" />
        </span>
      </a>
    </div>
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-0")}>
            <a
              href={item.url}
              className={cn(
                "inline-block text-base no-underline duration-100",
                item.url === `#${activeItem}`
                  ? "text-green-500 opacity-100"
                  : "opacity-50"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
