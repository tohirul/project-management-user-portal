"use client";

import { Menu, MoonIcon, Search, Settings, SunIcon } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { toggleTheme } from "@/store/slice/state/themeSlice";
import { RootState } from "@/store/store";
import { setIsSidebarCollapsed } from "@/store/slice/state/sidebarSlice";

export default function Navbar() {
  const theme = useAppSelector((state) => state.global.theme.mode);
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state.global.sidebar.isSidebarCollapsed,
  );
  const dispatch = useAppDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search Bar */}
      <div className="flex items-center justify-center gap-6">
        {!isSidebarCollapsed ? null : (
          <button
            className="cursor-pointer py-3"
            onClick={() => {
              dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
            }}
          >
            <Menu className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-52 items-center justify-center">
          <Search className="absolute top-1/2 left-2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="mt-1 w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={handleToggleTheme}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <MoonIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <SunIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className="h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="mr-5 ml-2 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block dark:bg-gray-800"></div>
      </div>
    </div>
  );
}
