import TaskItem from "./task-item";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect, useState } from "react";
import {
  useCustomActionMutation,
  useLazyCustomGetQuery,
} from "../../../redux/api";
import { EndpointList } from "../../../redux/endpointList";
import { useTaskManagmentStore } from "../../../zustand/taskStore";
import UpdateTask from "./update-task";
type Props = {};

function Tasks({}: Props) {
  const {
    data
  } = useTaskManagmentStore();

  const isUpdateTask = data?.isUpdateTask;
  const isCreateTask = data?.isCreateTask;
  const isDeleteTask = data?.isDeleteTask;


  const [
    getTasks,
    { data: tasksData, error: tasksError, isFetching: tasksFetching },
  ] = useLazyCustomGetQuery();

  const [updateSortNumber] = useCustomActionMutation();

  const [tasks, setTasks] = useState<any>(
    tasksData?.map((task: any) => ({
      id: task._id,
      title: task.description,
      type: "main",
      subTasks: [],
    })) || []
  );

  useEffect(() => {
    getTasks({
      url: EndpointList.GET_TASKS,
    }).then((res: any) => {
      if (res?.error) {
        return;
      }
      setTasks(
        res?.data.map((task: any) => ({
          id: task._id,
          title: task.description,
          type: "main",
          subTasks: Array.from(
            { length: Math.floor(Math.random() * 5) },
            (_, i) => ({
              id: `${task._id}.${i}`,
              type: "sub",
              title: `Sub Task ${task._id}.${i}`,
            })
          ),
        }))
      );
    });
  }, [isDeleteTask, isCreateTask, isUpdateTask]);

  const moveTask = async (draggedTaskId: string, targetTaskId: string) => {
    // Burada 'tasks' dizisinin sırasını değiştirebilirsiniz.
    const draggedIndex = tasks.findIndex(
      (task: any) => task.id === draggedTaskId
    );
    const targetIndex = tasks.findIndex(
      (task: any) => task.id === targetTaskId
    );

    // Eğer sıralama değişecekse, iki öğeyi takas yap
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedTasks = [...tasks];
      const [removedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(targetIndex, 0, removedTask);

      const updatedTasksWithSortNumber = updatedTasks.map((task, index) => {
        return {
          id: task.id,
          sortNumber: index,
        };
      });

      updateSortNumber({
        url: EndpointList.TASK_UPDATE_SORT,
        body: updatedTasksWithSortNumber,
      });

      setTasks(updatedTasks); // yeni sıralamayı set edin
    }
  };

  return (
    <div className="border border-gray-200 rounded-md border-b-0">
      <UpdateTask />
      <div>
        <DndProvider backend={HTML5Backend}>
          {tasks.map((task: any, index: any) => (
            <TaskItem key={index} {...task} moveTask={moveTask} />
          ))}
        </DndProvider>
      </div>
    </div>
  );
}

export default Tasks;
