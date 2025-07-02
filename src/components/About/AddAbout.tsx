"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// Import the Editor directly without using TinyVer
import { useMangeAboutMutation } from "@/redux/api/aboutApi";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";

// Zod validation schema
const blogSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function AddAbout() {

  const [description, setDescription] = useState("");

  const {
    
    handleSubmit,
    setValue,
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const handleEditorChange = (content: string) => {
    setDescription(content);
    setValue("description", content);
  };

  const [addAboutFn, { isLoading }] = useMangeAboutMutation();

  const onSubmit = async () => {
    try {
      const result = await addAboutFn({ details: description }).unwrap();
      if (result) {
        toast.success("Adding about successfully");
        window.location.href = "/about";
      }
    } catch {
      toast.error("Adding about faild");
    }

    // const formData = {
    //   ...data,
    //   description,
    //   photo: selectedFile,
    //   photoName: selectedFile?.name,
    //   photoSize: selectedFile?.size,
    // };

    console.log("Description HTML Content:", description);

    reset();

    setDescription("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Add About Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Description with TinyMCE */}
        <div className="col-span-2">
          <label className="block font-medium text-darkGray">
            Description <span className="text-red-500">*</span>
          </label>
          <Editor
            apiKey="4kjrncewwa4057zz04om0mle4q3to49bypq57bh6qgq5f0n3"
            initialValue="<p>About description</p>"
            init={{
              plugins:
                "advlist autolink link image lists charmap preview anchor pagebreak " +
                "searchreplace wordcount visualblocks code fullscreen insertdatetime media " +
                "table emoticons help",
              toolbar:
                "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | table | preview media fullscreen | " +
                "forecolor backcolor emoticons | help",
              menubar: "file edit view insert format tools table help",
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
            {isLoading ? "Adding about" : "Add About"}
          </Button>
        </div>
      </form>
    </div>
  );
}
