import dayjs from "dayjs";
import { ITask, TaskPriority, TaskDeadline, TaskStatus } from "@/@types/tasks";

const today = dayjs();
const tomorrow = today.add(1, "day");

export const SAMPLE_TASKS_DATA: ITask[] = [
  {
    id: "1",
    title: "Preparing for the morning meditation thing",
    description: "Spend 15 minutes meditating.",
    priority: TaskPriority.LOW,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.NO_DEADLINE,
    intervals: {
      startDate: today.hour(7).minute(0).second(0),
      endDate: today.hour(7).minute(15).second(0),
    },
    isRecurring: true,
    labels: ["self-care", "morning"],
  },
  {
    id: "2",
    title: "Team meeting",
    priority: TaskPriority.MID,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.SOFT_DEADLINE,
    intervals: {
      startDate: today.hour(14).minute(0).second(0),
      endDate: today.hour(15).minute(0).second(0),
    },
    isRecurring: false,
    labels: ["work", "meetings"],
  },
  {
    id: "3",
    title: "Submit project proposal",
    description: "Finalize and submit the proposal for the new project.",
    priority: TaskPriority.ASAP,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.HARD_DEADLINE,
    intervals: {
      startDate: today.hour(16).minute(0).second(0),
      endDate: today.hour(17).minute(0).second(0),
    },
    isRecurring: false,
    labels: ["work", "deadlines"],
  },
  {
    id: "4",
    title: "Weekly grocery shopping",
    description: "Buy groceries for the week.",
    priority: TaskPriority.LOW,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.NO_DEADLINE,
    intervals: {
      startDate: tomorrow.hour(10).minute(0).second(0),
      endDate: tomorrow.hour(11).minute(30).second(0),
    },
    isRecurring: true,
    labels: ["personal", "errands"],
  },
  {
    id: "5",
    title: "Doctor's appointment",
    description: "Attend a general checkup with the physician.",
    priority: TaskPriority.HIGH,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.HARD_DEADLINE,
    intervals: {
      startDate: tomorrow.hour(14).minute(0).second(0),
      endDate: tomorrow.hour(15).minute(0).second(0),
    },
    isRecurring: false,
    labels: ["health", "appointments"],
  },
  {
    id: "6",
    title: "Evening yoga",
    description: "Relax with a 30-minute yoga session.",
    priority: TaskPriority.LOW,
    status: TaskStatus.TO_DO,
    deadline: TaskDeadline.NO_DEADLINE,
    intervals: {
      startDate: tomorrow.hour(18).minute(0).second(0),
      endDate: tomorrow.hour(18).minute(30).second(0),
    },
    isRecurring: true,
    labels: ["self-care", "evening"],
  },
];