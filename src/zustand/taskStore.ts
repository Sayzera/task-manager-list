import { create } from "zustand";

interface TaskData {
  [key: string]: any;
}

interface TaskStore {
  data: TaskData;
  setData: (data: TaskData) => void;
}

export const useTaskManagmentStore = create<TaskStore>((set) => ({
  setData: (data:{}) => set({ data }),
  data: {},
}));
