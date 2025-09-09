"use client";
import React from "react";
import ProjectHeader from "@/components/ProjectHeader";

interface ProjectPageProps {
  id: number;
}

const ProjectPage = (props: ProjectPageProps): React.JSX.Element => {
  const { id } = props;
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  // const [isModalNewTaskOpen, setIsModalNewTaskOpen] =
  //   React.useState<boolean>(false);
  // const [isModalNewMemberOpen, setIsModalNewMemberOpen] =
  //   React.useState<boolean>(false);

  return (
    <div>
      <h1>Project ID: {id}</h1>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default ProjectPage;
