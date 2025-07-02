"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// Import the Editor directly without using TinyVer
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";

// Zod validation schema
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Blog title is required")
    .min(3, "Title must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
  readTime: z.string().min(1, "Read time is required"),
  photo: z.any().refine((files) => files?.length > 0, "Photo is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function AddBlog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

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
    setValue("description", content); // This is crucial for form validation
  };

  const [addBlogFn, { isLoading }] = useCreateBlogMutation();

  const onSubmit = async (data: BlogFormData) => {
    const formData = new FormData();

    const blogData = {
      title: data.title,
      date: data.date,
      time: data.readTime,
      description: description,
    };

    formData.append("data", JSON.stringify(blogData));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await addBlogFn(formData).unwrap();
      if (response) {
        toast.success("Blog create successfully");
        window.location.href = "/blog";
      }
    } catch {
      toast.error("Blog create faild!");
    }

    // const formDatas = {
    //   ...data,
    //   description,
    //   photo: selectedFile,
    //   photoName: selectedFile?.name,
    //   photoSize: selectedFile?.size,
    // };

    // console.log("Blog Form Data:", formDatas);
    // console.log("Validation passed successfully!");
    // console.log("Description HTML Content:", description);

    // Reset form after successful submission
    reset();
    setSelectedFile(null);
    setDescription("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Add Post</h1>

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

        {/* Attach Photo */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Attach Photo<span className="text-red-500">*</span>
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
            apiKey="4kjrncewwa4057zz04om0mle4q3to49bypq57bh6qgq5f0n3"
            initialValue="<p>Blog description</p>"
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Adding Posting..." : "  Add Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
