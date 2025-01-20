import { merge } from "lodash";
import { create } from "zustand";
import { v4 as uuid } from 'uuid';
import { ITask } from "@/@types/tasks";
import { DeepPartial } from "@/@types/utils.types";
import { SAMPLE_TASKS_DATA } from "@/app/data/tasks.data";

interface IState {
  tasks: ITask[];
}

interface IActions {
  updateState: (newState: DeepPartial<IState>) => void;
  updateTask: (taskId: string, updatedTask: ITask) => void;
  addTask: (newTask: Omit<ITask, 'id'>) => void;
}

type IStore = IState & IActions

const useGlobalStore = create<IStore>((set, get) => ({
  tasks: SAMPLE_TASKS_DATA,
  updateState(newState) {
    set(prev => ({
      ...prev,
      ...merge({}, prev, newState)
    }))
  },
  updateTask(taskId, updatedTask) {
    const previousTasks = get().tasks;
    const updatedTasks = previousTasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task)

    get().updateState({ tasks: updatedTasks })
  },
  addTask(newTask) {
    const prevTasks = get().tasks;
    get().updateState({ tasks: [...prevTasks, { ...newTask, id: uuid() }] })
  }
}))

export default useGlobalStore;