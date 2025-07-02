"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BlogTable from "../table/BlogTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetBlogsQuery } from "@/redux/api/blogApi";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, refetch } = useGetBlogsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Extracting pagination details from the response
  const totalItems = data?.data?.meta?.total || 0;
  const totalPages = data?.data?.meta?.totalPage || 1;
  const allBlogs = data?.data?.result || [];

  console.log("blog data", allBlogs);
  console.log("blogsssssssssss", data?.data);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Page change handler
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Close select dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-black text-[24px] font-semibold mb-6">Blog</h1>
        <div className="">
          <Link
            href={"/add-blog"}
            className="flex items-center gap-3 px-6 py-3 bg-secondary hover:bg-primary rounded-[4px] text-white"
          >
            Add Post <IoMdAdd className="text-2xl" />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl shadow-sm w-full">
        <div className="space-y-4">
          <BlogTable blogs={allBlogs} isLoading={isLoading} refetch={refetch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <div className="relative" ref={selectRef}>
            <button
              className="w-16 px-3 py-1 border border-gray-300 rounded-md flex items-center justify-between bg-white"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{itemsPerPage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isSelectOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isSelectOpen && (
              <div className="absolute top-full left-0 mt-1 w-16 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {[6, 10, 20, 50].map((value) => (
                  <div
                    key={value}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setItemsPerPage(value);
                      setIsSelectOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-500">
            from {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {totalPages > 0 && (
          <div className="flex items-center gap-1">
            <button
              className={`h-8 w-8 rounded-md flex items-center justify-center border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                className={`h-8 min-w-8 px-2 rounded-md flex items-center justify-center ${
                  page === currentPage
                    ? "bg-secondary text-white"
                    : page === "..."
                    ? "cursor-default"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className={`h-8 w-8 rounded-md flex items-center justify-center border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
