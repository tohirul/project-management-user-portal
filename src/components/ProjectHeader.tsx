"use client";
import React from "react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projectTablist } from "@/constants/projectTabList";
import { Filter, Grid3x3, ShareIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ProjectHeader(props: Props): React.JSX.Element {
  const { activeTab, setActiveTab } = props;

  return (
    <div className="px-4 xl:px-6">
      {/* Project Name Heading Title */}
      <div className="pt-6 pb-6 lg:pt-8 lg:pb-4">
        <Header name="Product Design Development" />
      </div>

      {/* Tabs */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border-y border-gray-200 pt-2 pb-[8px] md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          {projectTablist?.map(({ name, icon: Icon }) => (
            <TabButton
              key={name}
              name={name}
              icon={<Icon />}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button className="dark:bg-secondary bg-gray-200 text-neutral-500 hover:bg-gray-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </Button>
          <Button className="dark:bg-secondary bg-gray-200 text-neutral-500 hover:bg-gray-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
            <ShareIcon className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search tasks"
              className="dark:border-secondary dark:bg-secondary rounded-md border py-1 pr-4 pl-10 focus:outline-none dark:text-white"
            />
            <Grid3x3 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;

const TabButton = ({
  name,
  icon,
  activeTab,
  setActiveTab,
}: {
  name: string;
  icon: React.JSX.Element;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}): React.JSX.Element => {
  const isActve = activeTab === name;
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "after::left:0 relative flex items-center justify-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:h-[1px] after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-500 dark:hover:text-white",
        isActve
          ? "text-blue-600 after:bg-blue-600 dark:text-white dark:after:bg-white"
          : "after:bg-transparent",
      )}
      onClick={() => setActiveTab(name)}
    >
      {icon} <span className="pt-1">{name}</span>
    </Button>
  );
};
