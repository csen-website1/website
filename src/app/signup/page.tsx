import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div
      key="1"
      className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
    >
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-950">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              href="#"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form action="#" className="mt-8 space-y-6" method="POST">
          <input defaultValue="true" name="remember" type="hidden" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <Label className="sr-only" htmlFor="name">
                userN
              </Label>
              <Input
                autoComplete="name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                name="name"
                placeholder="User Name"
                required
                type="text"
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="email-address">
                Email address
              </Label>
              <Input
                autoComplete="email"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
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
            <div className="text-sm" />
          </div>
          <div>
            <Button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
              type="submit"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
