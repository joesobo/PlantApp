import { Task } from "./types";
import { schedulePushNotification } from "./notifications";
import { storeObject } from "./storage";

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
  if (!taskItems || taskItems.length === 0) {
    updateSelectedIndex(0);
  }

  if (!taskItems) {
    updateTaskItems([task]);
    storeObject("@taskItems", [task]);
  } else {
    const temp = taskItems.concat(task);
    updateTaskItems(temp);
    storeObject("@taskItems", temp);
  }
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
  storeObject("@taskItems", [...temp]);

  if (
    temp.length <= 0 ||
    selectedTaskIndex === taskItems.length ||
    selectedTaskIndex === 0
  ) {
    updateSelectedIndex(-1);
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

  storeObject("@taskItems", [
    ...taskItems.slice(0, selectedTaskIndex),
    task,
    ...taskItems.slice(selectedTaskIndex + 1),
  ]);
};
