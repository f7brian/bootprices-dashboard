"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FiCalendar, FiClock } from "react-icons/fi";
import { LiaEditSolid } from "react-icons/lia";

interface AboutData {
  id: string;
  date: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

interface AboutCardProps {
  aboutData: AboutData | null;
  isLoading: boolean;
}

export default function AboutCard({ aboutData, isLoading }: AboutCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const router = useRouter();

  const handleEdit = () => {
    router.push("/edit-about");
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="space-y-3 flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4 pt-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!aboutData) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No About Content Found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first about section content.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              About Us Content
            </h2>
            <Badge variant="secondary" className="w-fit">
              ID: {aboutData.id.slice(-8)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-blue-50 hover:border-blue-300"
              onClick={handleEdit}
            >
              <LiaEditSolid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Content Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
            Description
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-secondary">
            <div
              className="tinymce-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: aboutData.details || "<p>No description available</p>",
              }}
            />
          </div>
        </div>

        {/* Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Created</p>
              <p className="text-sm text-green-600">
                {formatDate(aboutData.createdAt)}
              </p>
              <p className="text-xs text-green-500">
                {formatTime(aboutData.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FiClock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Last Updated</p>
              <p className="text-sm text-blue-600">
                {formatDate(aboutData.updatedAt)}
              </p>
              <p className="text-xs text-blue-500">
                {formatTime(aboutData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
