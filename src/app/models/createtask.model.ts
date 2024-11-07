// src/app/models/create-task.model.ts
export interface CreateTask {
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    createdOn: string;
    isCompleted: boolean;
    tags: string;
    completedOn?: string | null;
  }