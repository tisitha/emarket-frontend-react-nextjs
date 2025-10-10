import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

type Props = {
  pageNumber: number;
  isLast: boolean;
  pageCount: number;
  prefix: string;
  postfix: string;
};

const CustomPagination = ({
  pageNumber,
  isLast,
  pageCount,
  prefix,
  postfix,
}: Props) => {
  return (
    <div className="py-15">
      <Pagination>
        <PaginationContent>
          {pageNumber == 0 ? (
            <PaginationItem>
              <div className="text-gray-600 font-medium text-sm items-center flex gap-1 px-2.5 sm:pl-2.5 hover:cursor-default">
                <ChevronLeftIcon size="15" />
                <span className="hidden sm:block">Previous</span>
              </div>
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationPrevious
                scroll={false}
                href={`${prefix}${pageNumber - 1}${postfix}`}
              />
            </PaginationItem>
          )}
          {Number(pageNumber) - 3 > 0 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Number(pageNumber) > 2 && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber - 3}${postfix}`}
              >
                {Number(pageNumber) - 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {Number(pageNumber) > 1 && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber - 2}${postfix}`}
              >
                {Number(pageNumber) - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {Number(pageNumber) > 0 && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber - 1}${postfix}`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink scroll={false} href="#" isActive>
              {Number(pageNumber) + 1}
            </PaginationLink>
          </PaginationItem>
          {Number(pageNumber) + 1 < Number(pageCount) && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber + 1}${postfix}`}
              >
                {Number(pageNumber) + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {Number(pageNumber) + 2 < Number(pageCount) && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber + 2}${postfix}`}
              >
                {Number(pageNumber) + 3}
              </PaginationLink>
            </PaginationItem>
          )}
          {Number(pageNumber) + 3 < Number(pageCount) && (
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={`${prefix}${pageNumber + 3}${postfix}`}
              >
                {Number(pageNumber) + 4}
              </PaginationLink>
            </PaginationItem>
          )}
          {Number(pageNumber) + 4 < Number(pageCount) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {isLast == true ? (
            <PaginationItem>
              <div className="text-gray-600 font-medium text-sm items-center flex gap-1 px-2.5 sm:pl-2.5 hover:cursor-default">
                <span className="hidden sm:block">Next</span>
                <ChevronRightIcon size="15" />
              </div>
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationNext
                scroll={false}
                href={`${prefix}${pageNumber + 1}${postfix}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
