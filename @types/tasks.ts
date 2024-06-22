export interface ITask {
  id?: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadlineType: TaskDeadline;
  intervals?: TaskInterval[];
  isRecurring?: boolean;
  timeGroup?: string;
  labels?: string[];
}

interface TaskInterval {
  startDate: Date,
  endDate: Date
}

export enum TaskPriority {
  ASAP = 'ASAP',
  HIGH = 'High',
  MID = 'Medium',
  LOW = 'Low'
}

export enum TaskDeadline {
  HARD_DEADLINE = 'Hard deadline',
  SOFT_DEADLINE = 'Soft deadline',
  NO_DEADLINE = 'No deadline'
}

export enum TaskStatus {
  TO_DO = 'To-Do',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}