"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Page() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/auth/login", {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(response.data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              href="/signup"
            >
              register for a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <input defaultValue="true" name="remember" type="hidden" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <Label className="sr-only" htmlFor="email-address">
                Email address
              </Label>
              <Input
                autoComplete="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                id="email-address"
                name="email"
                placeholder="Email address"
                required
                type="email"
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-800 dark:text-indigo-400 dark:focus:ring-indigo-500"
                id="remember-me"
                name="remember-me"
              />
              <Label
                className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                htmlFor="remember-me"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                href="#"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
              type="submit"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
