"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BeautifulPageLoading } from "../ui/BeautifulSpinner";
import Image from "next/image";

// Zod validation schema - make photo optional for edit
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Blog title is required")
    .min(3, "Title must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
  readTime: z.string().min(1, "Read time is required"),
  photo: z.any().optional(), // Make photo optional for edit
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  console.log("slug blog", slug);

  const { data, isLoading: isFetching } = useGetSingleBlogQuery(slug);
  console.log("single data", data?.data);

  const [editBlogFn, { isLoading }] = useUpdateBlogMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  // Pre-populate form fields when data is loaded
  useEffect(() => {
    if (data?.data && !isDataLoaded) {
      const blogData = data.data;

      // Set form values
      setValue("title", blogData.title || "");
      setValue("date", blogData.date || "");
      setValue("readTime", blogData.time || "");

      // Set description for editor
      setDescription(blogData.description || "");
      setValue("description", blogData.description || "");

      setIsDataLoaded(true);
    }
  }, [data, setValue, isDataLoaded]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/") && file.size <= 25 * 1024 * 1024) {
        setSelectedFile(file);
        setValue("photo", e.dataTransfer.files);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/") && file.size <= 25 * 1024 * 1024) {
        setSelectedFile(file);
        setValue("photo", e.target.files);
      }
    }
  };

  const handleEditorChange = (content: string) => {
    setDescription(content);
    setValue("description", content);
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      const formData = new FormData();

      // Create blog data object in the specified format
      const blogData = {
        title: data.title,
        date: data.date,
        time: data.readTime,
        description: description,
      };

      // Append blog data as JSON string
      formData.append("data", JSON.stringify(blogData));

      // Append image if selected
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // Call the update mutation with id and formData
      const result = await editBlogFn({ slug, formData }).unwrap();

      if (result) {
        toast.success("Blog updated successfully!");
        router.push("/blog")
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto">
        <BeautifulPageLoading text="Loading blog data..." variant="rainbow" />
      </div>
    )
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Blog not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Blog Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Blog Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Blog title..."
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-1 gap-4">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date<span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label
              htmlFor="readTime"
              className="text-sm font-medium text-gray-700"
            >
              Time<span className="text-red-500">*</span>
            </Label>
            <Input
              id="readTime"
              {...register("readTime")}
              placeholder="Read time..."
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {errors.readTime && (
              <p className="text-red-500 text-sm">{errors.readTime.message}</p>
            )}
          </div>
        </div>

        {/* Current Image Display */}
        {data?.data?.photo && !selectedFile && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Current Image
            </Label>
            <div className="border rounded-lg p-4">
              <Image
                src={data.data.photo || "/placeholder.svg"}
                alt="Current blog image"
                className="max-w-[150px] h-[150px] rounded-md"
                width={100}
                height={100}
              />
            </div>
          </div>
        )}

        {/* Attach Photo */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            {data?.data?.photo ? "Change Photo (Optional)" : "Attach Photo"}
            {!data?.data?.photo && <span className="text-red-500">*</span>}
          </Label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Cloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop file or browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Format: .jpeg, .png & Max file Size: 25 MB
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-md"
            >
              Choose Files
            </Button>
            {selectedFile && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          {typeof errors.photo?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}
        </div>

        {/* Description with TinyMCE */}
        <div className="col-span-2">
          <label className="block font-medium text-darkGray">
            Description <span className="text-red-500">*</span>
          </label>
          <Editor
            apiKey="jx8w5eg4ntbtor7ytgxcbut01q4z73zx8c1xtzu9htqyj4bq"
            value={description}
            init={{
              plugins:
                "advlist autolink link image lists charmap preview anchor pagebreak " +
                "searchreplace wordcount visualblocks code fullscreen insertdatetime media " +
                "table emoticons help",
              toolbar:
                "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | table | preview media fullscreen | " +
                "forecolor backcolor emoticons | help",
              menubar: "",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}
            onEditorChange={handleEditorChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Updating blog..." : "Update Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
}
