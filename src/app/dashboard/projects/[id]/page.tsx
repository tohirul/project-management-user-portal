"use server";
import React from "react";
import ProjectPage from "@/components/pages/ProjectPage";

type Props = {
  params: {
    id: string;
  };
};

async function page({ params }: Props): Promise<React.JSX.Element> {
  const { id } = await params;

  // console.log("id: ", parseInt(id));

  return <ProjectPage id={parseInt(id)} />;
}

export default page;
