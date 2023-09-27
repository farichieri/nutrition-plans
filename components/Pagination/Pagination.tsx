import { DOTS } from "@/hooks/usePagination";
import { FC, useState } from "react";
import { FilterQueries } from "@/types";
import { HITS_PER_PAGE } from "@/constants/search";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const buttonClass =
  "rounded-full hover:bg-green-500/20 active:bg-green-500 w-9 h-9 flex items-center justify-center";
const buttonDisabledClass =
  "rounded-full opacity-0 w-9 h-9 flex items-center justify-center";
const buttonSelectedClass = "bg-green-500/50 opacity-100";

interface Props {
  fixedQueries?: FilterQueries;
  queries: FilterQueries;
  setLocalQueries: Function;
  updateRoute: boolean;
  pages: number;
}

const Pagination: FC<Props> = ({
  queries,
  setLocalQueries,
  updateRoute,
  pages,
}) => {
  const router = useRouter();
  const page = queries.page ? parseInt(queries.page as string) : 1;

  const paginationRange: any = usePagination({
    currentPage: page,
    totalCount: pages,
    totalPages: pages,
    pageSize: HITS_PER_PAGE,
  });

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent
  ) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;

    if (name === "previous" && page === 1) return;
    if (name === "next" && page === pages) return;

    let query;
    query = {
      ...queries,
      page: value,
    };
    if (updateRoute) {
      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: false }
      );
    } else {
      setLocalQueries(query);
    }
  };

  if (pages <= 1) return <></>;

  return (
    <ul
      className="m-auto flex items-center justify-center gap-2 pt-4"
      aria-label="Foods Searched pagination list"
    >
      <li>
        <button
          aria-label="Goto previous page"
          className={page === 1 ? buttonDisabledClass : buttonClass}
          disabled={page === 1}
          name="previous"
          onClick={handleSelect}
          type="button"
          value={page - 1}
        >
          <MdOutlineArrowBackIos className="pointer-events-none flex h-5 w-5" />
        </button>
      </li>

      {paginationRange.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="dots">
              &#9230;
            </li>
          );
        }

        return (
          <li aria-current={pageNumber === page && "page"} key={index}>
            <button
              aria-label={`Go to page ${pageNumber}`}
              onClick={handleSelect}
              type="button"
              value={pageNumber}
              className={`${buttonClass} ${
                pageNumber === page ? buttonSelectedClass : ""
              }`}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li>
        <button
          aria-label="Go to next page"
          className={page === pages ? buttonDisabledClass : buttonClass}
          disabled={page === pages}
          name="next"
          onClick={handleSelect}
          type="button"
          value={page + 1}
        >
          <MdOutlineArrowForwardIos className="pointer-events-none h-5 w-5" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
