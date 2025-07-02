"use client";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProductTable from "../table/ProductTable";
import { Button } from "../ui/button";

export default function Product() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery(page);

  const allProducts = data?.data?.result?.products || [];

  console.log("blog data", allProducts);
  console.log("blogsssssssssss", data?.data);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-black text-[24px] font-semibold mb-6">
          All Products
        </h1>
      </div>

      <div className="rounded-2xl shadow-sm w-full">
        <div className="space-y-4">
          <ProductTable products={allProducts} isLoading={isLoading} page={page} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing page {page} out of 10
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="p-2"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {[...Array(10)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={pageNumber}
                variant="outline"
                size="sm"
                className={
                  page === pageNumber
                    ? "bg-secondary text-white border-secondary"
                    : ""
                }
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            className="p-2"
            disabled={page === 10}
            onClick={() => setPage((prev) => Math.min(prev + 1, 10))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
