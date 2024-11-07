export interface Task {
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;  
    createdOn: string;
    isCompleted: boolean;
    tags: string;
    completedOn?: string | null;  
    color?: string;  
}