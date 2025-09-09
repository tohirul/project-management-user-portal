// types/prisma.ts

import { Priority, Status } from "@/constants/enum";

export interface User {
  userId: number;
  cognitoId: string;
  username: string;
  profilePictureUrl?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  memberships?: UserTeam[];
  authoredTasks?: Task[];
  assignedTasks?: Task[];
  taskAssignments?: TaskAssignment[];
  attachments?: Attachment[];
  comments?: Comment[];
  ownedProjects?: Project[];
}

export interface Team {
  id: number;
  teamName: string;
  createdAt: string;
  updatedAt: string;

  // Relations
  memberships?: UserTeam[];
  projectLinks?: ProjectTeam[];
}

export interface UserTeam {
  id: number;
  userId: number;
  teamId: number;
  role?: string | null;
  joinedAt: string;

  user?: User;
  team?: Team;
}

export interface Project {
  id: number;
  ownerUserId: number;
  name: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  tasks?: Task[];
  projectLinks?: ProjectTeam[];
  owner?: User;
}

export interface ProjectTeam {
  id: number;
  teamId: number;
  projectId: number;
  createdAt: string;
  updatedAt: string;

  team?: Team;
  project?: Project;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status?: Status;
  priority?: Priority;
  tags?: string | null;
  startDate?: string | null;
  dueDate?: string | null;
  points?: number | null;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number | null;
  createdAt: string;
  updatedAt: string;

  // Relations
  project?: Project;
  author?: User;
  assignee?: User | null;
  taskAssignments?: TaskAssignment[];
  attachments?: Attachment[];
  comments?: Comment[];
}

export interface TaskAssignment {
  id: number;
  userId: number;
  taskId: number;
  createdAt: string;
  updatedAt: string;

  // Relations
  user?: User;
  task?: Task;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName?: string | null;
  taskId: number;
  uploadedById: number;
  createdAt: string;
  updatedAt: string;

  // Relations
  task?: Task;
  uploadedBy?: User;
}

export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;

  // Relations
  task?: Task;
  user?: User;
}
