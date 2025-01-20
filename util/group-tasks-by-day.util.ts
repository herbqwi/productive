import { ITask } from "@/@types/tasks";

export default function groupTasksByDay(tasks: ITask[]) {
  const tasksMap = new Map<string, ITask[]>();

  tasks.forEach(task => {
    const key = task.intervals?.startDate.format('DDMMYY') || '';
    const prevTasks = tasksMap.get(key) || [];

    tasksMap.set(key, [...prevTasks, task])
  })

  return Array.from(tasksMap.values());
}