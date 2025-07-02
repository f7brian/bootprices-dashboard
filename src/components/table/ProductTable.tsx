"use client";

import Image, { StaticImageData } from "next/image";

interface Employee {
  id: number;
  Brand: {
    DisplayValue: string;
  };
  Title: string;
  Price: string;
  Image: {
    URL: string | StaticImageData;
  }; // Assuming image URL or base64 string
}

interface EmployeeTableProps {
  products: Employee[];
  isLoading: boolean;
  page: number;
}

export default function ProductTable({
  products,
  page,
  isLoading,
}: EmployeeTableProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#F3E9DA] rounded-2xl">
            <tr className="">
              <th className="text-center py-3 px-4 font-medium text-gray-700 w-[200px]">
                SL
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 w-[200px]">
                Image
              </th>

              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Brand
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Title
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Price
              </th>
              {/* <th className="text-center py-3 px-4 font-medium text-gray-700">
                Status
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-[#F2F2F2]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse hover:bg-gray-50">
                    <td className="py-3 px-4 text-center">
                      <div className="h-4 w-6 mx-auto bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="h-4 w-24 mx-auto bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="h-4 w-20 mx-auto bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="h-4 w-24 mx-auto bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="h-4 w-28 mx-auto bg-gray-200 rounded" />
                    </td>
                    {/* <td className="py-3 px-4 text-center">
                      <div className="h-8 w-24 mx-auto bg-gray-200 rounded-full" />
                    </td> */}
                  </tr>
                ))
              : products?.map((product, index) => (
                  <tr key={index} className=" hover:bg-gray-50">
                    <td className="py-3 text-center px-4">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="py-3 text-center px-4">
                      <Image
                        src={product?.Image?.URL}
                        alt={product.Title}
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded-[8px] mx-auto"
                      />
                    </td>

                    <td className="py-3 text-center px-4">
                      {product?.Brand?.DisplayValue}
                    </td>
                    <td className="py-3 text-center px-4">
                      {product.Title.slice(0, 25) + "..."}
                    </td>
                    <td className="py-3 text-center px-4">{product.Price}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
