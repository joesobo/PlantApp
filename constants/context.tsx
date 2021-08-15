import { createContext } from "react";
import { light } from "./colors";
import { Task } from "./types";
import { addTask, deleteTask, createTask, updateTask } from "./tasks";

export const MainContext = createContext({
  isDark: false,
  useWeather: false,
  useNotifications: false,
  addTask: addTask,
  deleteTask: deleteTask,
  createTask: createTask,
  updateTask: updateTask,
  taskItems: [] as Task[],
  updateTaskItems: (_tasks: Task[]) => {},
  selectedTaskIndex: -1,
  updateSelectedIndex: (_value: number) => {},
  toggleTheme: () => {},
  toggleWeather: () => {},
  toggleNotifications: () => {},
  theme: {
    colors: light,
  },
  schedulePushNotification: (
    _time: number,
    _title: string,
    _task: Task,
    _isWater: boolean,
    _body?: string | undefined
  ) => {},
  registerForPushNotificationsAsync: () => {},
});
