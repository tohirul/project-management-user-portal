// src/types/data.types.ts
import { Priority, Status } from "@/constants/enum";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  congnitoId?: string;
  teamId?: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: number;
  fileUrl: string;
  filename: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string[];
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}
