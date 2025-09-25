"use server";
import React from "react";
import ProjectPage from "@/components/views/ProjectView";

type Props = {
  params: {
    id: string;
  };
};

async function page({ params }: Props): Promise<React.JSX.Element> {
  const { id } = await params;

  return <ProjectPage id={parseInt(id)} />;
}

export default page;
