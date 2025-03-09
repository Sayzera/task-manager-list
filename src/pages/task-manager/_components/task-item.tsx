type Props = {};
import Checkbox from "@mui/material/Checkbox";
import RightArrow from "../../../assets/icons/right-arrow.svg?react";
import SubTask from "../../../assets/icons/sub-task.svg?react";
import Wait from "../../../assets/icons/wait.svg?react";
import BottomArrow from "../../../assets/icons/bottom-arrow.svg?react";
import Priorities from "../../../assets/icons/priorities.svg?react";
import BossAvatar from "../../../assets/icons/boss-avatar.svg?react";
import ChatbubbleEllipsesOutline from "../../../assets/icons/chatbubble-ellipses-outline.svg?react";
import DividerDot from "../../../assets/icons/divider-dot.svg?react";
import TaskTag from "./task-tag";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import DeleteItem from "./delete-item";
import { useTaskManagmentStore } from "../../../zustand/taskStore";
import { Edit } from "@mui/icons-material";

interface TaskItemProps {
  title: string;
  id: string;
  subTasks?: TaskItemProps[];
  type?: "main" | "sub" | any;
  moveTask: (draggedTaskId: string, targetTaskId: string) => void;
}

function TaskItem({
  title,
  subTasks = [],
  type = "main",
  id,
  moveTask,
}: TaskItemProps) {
  const { data, setData } = useTaskManagmentStore();

  const [isOver, setIsOver] = useState(false);

  const [openSubTasks, setOpenSubTasks] = useState(false);

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: "TASK",
    collect: (monitor) => {
      const item = monitor.getItem();
      if (item && item.id !== id) {
        setIsOver(monitor.isOver());
      } else {
        setIsOver(false);
      }
    },

    hover: (draggedItem: { id: string }) => {
      setOpenSubTasks(false);
    },
    drop: (draggedItem) => {
      setIsOver(false);
      moveTask(draggedItem.id, id);
    },
  });

  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        className={`p-2 border-t-0 border-b border-gray-200 flex w-full justify-between relative 
          ${isDragging && "bg-gray-200"}
          `}
      >
        {isOver && (
          <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[#5236FF]"></div>
        )}
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                sx={{
                  color: "#974FFF",
                  "&.Mui-checked": {
                    color: "#974FFF",
                  },
                }}
              />
              {type === "main" ? (
                openSubTasks ? (
                  <BottomArrow
                    className="cursor-pointer"
                    style={{ width: "1rem", height: "auto" }}
                    onClick={() => setOpenSubTasks(!openSubTasks)}
                  />
                ) : (
                  <RightArrow
                    className="cursor-pointer"
                    style={{ width: "0.5rem", height: "auto" }}
                    onClick={() => setOpenSubTasks(!openSubTasks)}
                  />
                )
              ) : (
                <div className="absolute top-0 bottom-0 left-[60px] h-full w-1 bg-[#5236FF]"></div>
              )}
              <span
                className={`text-[#974FFF] font-semibold ${type === "sub" && "ml-[20px]"}`}
              >
                BD-1
              </span>
              <SubTask className="size-6" />
              <div className="flex flex-col">
                <span className="text-base">{title}</span>
              </div>
            </div>

            <div className="flex items-center gap-10 rounded-md relative">
              <div className="flex items-center gap-2">
                <DeleteItem id={id} />
                <Edit
                  className="cursor-pointer text-blue-500 "
                  onClick={() => setData({ ...data, isOpenUpdateTask: true,
                    taskUpdateData:{
                      id:id,
                      title:title
                    }
                   })}
                />
                <Wait />

                <div className="flex items-center bg-gray-100 p-1 px-2 gap-2">
                  <span className="font-bold text-gray-500">Beklemede</span>
                  <BottomArrow />
                </div>
              </div>
              <Priorities />
              <BossAvatar />
            </div>
          </div>

          <div className="pl-[130px] flex gap-2 items-center ">
            <ChatbubbleEllipsesOutline className="size-5" />
            <span className="bg-red-500 px-2 rounded-md text-white">8</span>
            <DividerDot className="size-2 ml-2" />
            <TaskTag />
          </div>
        </div>
      </div>

      {openSubTasks && (
        <div>
          {subTasks.map((subTask, index) => (
            <TaskItem key={index} {...subTask} type="sub" />
          ))}
        </div>
      )}
    </>
  );
}

export default TaskItem;
