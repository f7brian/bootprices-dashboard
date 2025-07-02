"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from "@/assets/Frame 2147225638 (1).png";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginFn, { isLoading }] = useLoginMutation();
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginFn({
        email: email,
        password: password,
      }).unwrap();

      console.log("response", response);

      if (response) {
        // Set a cookie after successful login (example: set a token or flag)
        Cookies.set("token", response?.data?.accessToken);
        toast.success("Logged in successfully");
        route.push("/dashboard");
      }
    } catch  {
      toast.error("Login failed");
    }

    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex md:w-1/2 bg-[#D4B896] relative items-center justify-center">
        <div className="relative w-[800px] h-[770px]">
          <Image
            src={loginImage}
            alt="E-commerce illustration with person and shopping elements"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-[800px] space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600">
              Please enter your email and password to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email*
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password*
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Forget Password Link */}
            {/* <div className="text-right">
              <a href="#" className="text-sm text-red-500 underline">
                Forget Password
              </a>
            </div> */}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-primary text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Login..." : "Login"}
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile illustration - shown on small screens */}
      <div className="lg:hidden absolute inset-0 bg-[#D4B896] opacity-10 pointer-events-none">
        <Image
          src="/login-illustration.png"
          alt="E-commerce illustration"
          fill
          className="object-cover opacity-20"
        />
      </div>
    </div>
  );
}
