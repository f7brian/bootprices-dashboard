"use client";

import { useDeleteBlogMutation } from "@/redux/api/blogApi";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

interface blog {
  id: number;
  date: string;
  title: string;
  description: string;
  status: string;
  photo: string | StaticImageData; // Assuming image URL or base64 string
}

interface EmployeeTableProps {
  blogs: blog[];
  isLoading: boolean;
  refetch: () => void;
}

export default function BlogTable({
  blogs,
  isLoading,
  refetch,
}: EmployeeTableProps) {
  const [deleteBlogFn] = useDeleteBlogMutation();

  // const handleBlogDelete = async (id: string) => {
  //   // You can call your delete mutation here, e.g.:
  //   try {
  //     const response = await deleteBlogFn(id).unwrap();
  //     if (response) {
  //       toast.success("Blog delete successfully");
  //       refetch();
  //     }
  //   } catch (error) {
  //     toast.error("Blog delete faild!");
  //   }
  // };

  const handleBlogDelete = async (id: string) => {
    await toast.promise(deleteBlogFn(id).unwrap(), {
      loading: "Deleting blog...",
      success: () => {
        refetch();
        return "Blog deleted successfully";
      },
      error: "Failed to delete blog!",
    });
  };

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
                Date
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Title
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Description
              </th>

              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Action
              </th>
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
                    <td className="py-3 px-4 text-center">
                      <div className="h-8 w-24 mx-auto bg-gray-200 rounded-full" />
                    </td>
                  </tr>
                ))
              : blogs?.map((blog, index) => (
                  <tr key={index} className=" hover:bg-gray-50">
                    <td className="py-3 text-center px-4">{index + 1}</td>
                    <td className="py-3 text-center px-4">
                      <Image
                        src={blog.photo}
                        width={100}
                        height={100}
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded-[8px] mx-auto"
                      />
                    </td>

                    <td className="py-3 text-center px-4">
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 text-center px-4 truncate">
                      {blog.title.slice(0, 20) + "..."}
                    </td>
                    <td
                      className="py-3 text-center px-4"
                      dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 20) + "..." }}
                    />

                    <td className="py-3 mt-4 text-center px-4 flex items-center justify-center">
                      <Link href={`/edit-blog?id=${blog?.id}`}>
                        <LiaEditSolid className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
                      </Link>
                      <button
                        onClick={() => handleBlogDelete(String(blog?.id))}
                        className="ml-2"
                      >
                        <RiDeleteBin6Line className="h-5 w-5 text-gray-600 hover:text-red-600 transition-colors" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
