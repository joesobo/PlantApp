import { Task } from "./types";
import { schedulePushNotification } from "./notifications";

const daysToSeconds = (days: number) => {
  return days * 24 * 60 * 60;
};

const canNotifyForEl = (elIncrement: number, useNotifications: boolean) => {
  return useNotifications && elIncrement !== 0;
};

export const addTask = (
  task: Task,
  taskItems: Task[],
  updateTaskItems: (arg0: any) => void,
  updateSelectedIndex: (arg0: number) => void
) => {
  if (taskItems.length === 0) {
    updateSelectedIndex(0);
  }
  const temp = taskItems.concat(task);
  updateTaskItems(temp);
};

export const deleteTask = (
  taskItems: Task[],
  updateTaskItems: (arg0: Task[]) => void,
  selectedTaskIndex: number,
  updateSelectedIndex: (arg0: number) => void
) => {
  let temp = taskItems;
  temp.splice(selectedTaskIndex, 1);
  updateTaskItems([...temp]);

  if (temp.length <= 0 || selectedTaskIndex === taskItems.length) {
    updateSelectedIndex(-1);
  } else {
    const index = selectedTaskIndex;
    updateSelectedIndex(index);
  }
};

export const createTask = (
  task: Task,
  taskItems: Task[],
  updateTaskItems: (arg0: any) => void,
  updateSelectedIndex: (arg0: number) => void,
  useNotifications: boolean
) => {
  const { waterIncrement, fertIncrement } = task;
  addTask(task, taskItems, updateTaskItems, updateSelectedIndex);
  canNotifyForEl(waterIncrement, useNotifications)
    ? schedulePushNotification(
        daysToSeconds(waterIncrement),
        "Hey there! It's time to water your plant!",
        task,
        true
      )
    : null;
  canNotifyForEl(fertIncrement, useNotifications)
    ? schedulePushNotification(
        daysToSeconds(fertIncrement),
        "Hey there! It's time to fertilizer your plant!",
        task,
        false
      )
    : null;
};

export const updateTask = (
  task: Task,
  taskItems: Task[],
  updateTaskItems: (arg0: Task[]) => void,
  selectedTaskIndex: number
) => {
  updateTaskItems([
    ...taskItems.slice(0, selectedTaskIndex),
    task,
    ...taskItems.slice(selectedTaskIndex + 1),
  ]);
};
