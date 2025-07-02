"use client";

import { useGetAboutQuery } from "@/redux/api/aboutApi";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import AboutCard from "../table/AboutCard";
// import AboutCard from "../card/AboutCard"

export default function About() {
  const { data, isLoading } = useGetAboutQuery({});

  console.log("about data", data?.data);

  const aboutData = data?.data || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">About Us</h1>
            <p className="text-gray-600">Manage your about section content</p>
          </div>
          <Link
            href={"/add-about"}
            className="flex items-center gap-3 px-6 py-3 bg-secondary hover:bg-primary rounded-[4px] text-white"
          >
            <IoMdAdd className="text-xl" />
            Add About
          </Link>
        </div>

        {/* Content Section */}
        <div className="space-y-6 mt-10">
          <AboutCard aboutData={aboutData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
