"use client";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { SidebarLinkProps } from "@/types/Prop.types";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useListProjectsQuery } from "@/store/api/v1_endpoints/projectApi";
import { Project } from "@/types/data.types";
gsap.registerPlugin(useGSAP);

function Sidebar() {
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state.global.sidebar.isSidebarCollapsed,
  );
  // const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sidebarRef.current;
      const content = contentRef.current;
      if (!el || !content) return;

      if (!isSidebarCollapsed) {
        gsap.set(el, { display: "flex" });
        gsap.fromTo(
          el,
          { opacity: 0.1 },
          { opacity: 1, duration: 0.25, ease: "sine.inOut" },
        );
        gsap.fromTo(
          content,
          { autoAlpha: 0, x: -25 },
          { autoAlpha: 1, x: 0, duration: 0.25, delay: 0.1 },
        );
      } else {
        gsap.to(content, {
          autoAlpha: 0,
          duration: 0.5,
        });
        gsap.to(el, {
          opacity: 0,
          duration: 1.5,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(el, { display: "none" });
          },
        });
      }
    },
    { dependencies: [isSidebarCollapsed] },
  );

  return (
    !isSidebarCollapsed && (
      <div
        ref={sidebarRef}
        className="sidebar-scroll fixed top-0 left-0 z-40 flex h-full w-64 flex-col overflow-y-auto bg-white pb-12 dark:bg-black"
      >
        {
          <div
            ref={contentRef}
            className="flex h-full w-full flex-col justify-start"
          >
            {/* TOP LOGO */}
            <div className="z-50 flex min-h-[56px] items-center justify-between bg-white px-6 pt-3 dark:bg-black">
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                EDLIST
              </div>
            </div>

            {/* TEAM */}
            <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                  EDROH TEAM
                </h3>
                <div className="mt-1 flex items-start gap-2">
                  <LockIcon className="mt-[.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-xs text-gray-500">Private</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <SidebarNav />
          </div>
        }
      </div>
    )
  );
}

const SidebarNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showProjects, setShowProjects] = useState(false);
  const { data: result, isSuccess } = useListProjectsQuery({
    limit: 0,
    sortOrder: "asc",
  });
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (showProjects) {
        // Reset to display block to measure scrollHeight
        gsap.set(el, { display: "block", height: "auto" });
        const height = el.scrollHeight;

        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height,
            opacity: 1,
            duration: 0.6,
            ease: "sine.inOut",
          },
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(el, { display: "none" });
          },
        });
      }
    },
    { dependencies: [showProjects] },
  );

  return (
    <nav className="z-10 w-full">
      <SidebarLink icon={Home} label="Dashboard" href="/dashboard" />
      <SidebarLink
        icon={Briefcase}
        label="Timeline"
        href="/dashboard/timeline"
      />
      <SidebarLink icon={Search} label="Search" href="/dashboard/search" />
      <SidebarLink
        icon={Settings}
        label="Settings"
        href="/dashboard/settings"
      />
      <SidebarLink icon={User} label="Users" href="/dashboard/users" />
      <SidebarLink icon={Users} label="Teams" href="/dashboard/teams" />

      <button
        onClick={() => setShowProjects((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between px-8 py-3 font-medium text-gray-800 dark:text-gray-200"
      >
        <span className="py-2">Projects</span>
        {showProjects ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      <div ref={containerRef} style={{ overflow: "hidden", height: 0 }}>
        {isSuccess &&
          result?.data?.map((project: Project) => (
            <SidebarLink
              key={project.id}
              icon={Layers3}
              label={project.name}
              href={`/dashboard/projects/${project.id}`}
            />
          ))}
      </div>
      <PriorityLinks />
    </nav>
  );
};

const PriorityLinks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleLinks = () => {
    setIsOpen((prev) => !prev);
  };

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (isOpen) {
        // Reset to display block to measure scrollHeight
        gsap.set(el, { display: "block", height: "auto" });
        const height = el.scrollHeight;

        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(el, { display: "none" });
          },
        });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <div>
      <button
        onClick={() => toggleLinks()}
        className="flex w-full cursor-pointer items-center justify-between px-8 py-3 font-medium text-gray-800 dark:text-gray-200"
      >
        <span className="py-2">Priority</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      <div ref={containerRef} style={{ overflow: "hidden", height: 0 }}>
        <SidebarLink
          icon={AlertCircle}
          label="Urgent"
          href="/dashboard/priority/urgent"
        />
        <SidebarLink
          icon={ShieldAlert}
          label="High"
          href="/dashboard/priority/high"
        />
        <SidebarLink
          icon={AlertTriangle}
          label="Medium"
          href="/dashboard/priority/medium"
        />
        <SidebarLink
          icon={AlertOctagon}
          label="Low"
          href="/dashboard/priority/low"
        />
        <SidebarLink
          icon={Layers3}
          label="Backlog"
          href="/dashboard/priority/backlog"
        />
      </div>
    </div>
  );
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  // isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname === "/dashboard/";
  // const screenWidth = window.innerWidth;

  // const dispatch = useAppDispatch();
  // const isSidebarCollapsed = useAppSelector(
  //   (state: RootState) => state.global.sidebar.isSidebarCollapsed,
  // );

  return (
    <Link href={href} className="w-full">
      <div
        className={cn(
          "dark:bg-dark relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive ? "bg-dark text-white" : "",
        )}
      >
        {isActive && (
          <div className="absolute top-0 left-0 h-full w-[5px] bg-blue-200"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
