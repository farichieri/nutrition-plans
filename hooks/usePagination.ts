import { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination({
  totalCount,
  currentPage,
  totalPages,
  pageSize,
}: {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}) {
  const paginationRange = useMemo(() => {
    const siblings = 1;
    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    const firstPageIndex = 1;

    if (totalPages <= 4) {
      return range(1, totalPages);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, totalPages];
    }
  }, [totalCount, currentPage, totalPages, pageSize]);

  return paginationRange;
}

export default usePagination;
