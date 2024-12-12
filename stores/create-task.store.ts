import { ITask, TaskDeadline, TaskPriority, TaskStatus } from "@/@types/tasks";
import { create } from "zustand";

interface IStore extends ITask {
  updateTask: (newFields: Partial<ITask>) => void;
}

const DEFAULT_TASK: ITask = {
  id: '',
  title: '',
  description: '',
  priority: TaskPriority.ASAP,
  status: TaskStatus.TO_DO,
  deadlineType: TaskDeadline.NO_DEADLINE,
  intervals: [],
  isRecurring: false,
  timeGroup: '',
  labels: [''],
}

const useCreateTaskStore = create<IStore>((set, get) => ({
  ...DEFAULT_TASK,
  updateTask: (newFields) =>
    set(prev => ({
      ...prev,
      ...newFields
    })),
}))

export default useCreateTaskStore;