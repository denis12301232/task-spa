export interface Task {
   title: string;
   description: string;
   date: string;
   id: number;
   status: TaskStatus;
   tags: string[];
}

export type TaskStatus = 'completed' | 'expired' | 'active';