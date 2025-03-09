import { Button, Drawer, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCustomActionMutation } from "../../../redux/api";
import { useNotifications } from "@toolpad/core";
import { useTaskManagmentStore } from "../../../zustand/taskStore";

type Props = {};

function UpdateTask({}: Props) {
  const { data: taskStoreData, setData } = useTaskManagmentStore();

  const [
    updateTaskMutation,
    {
      isLoading: updateTaskLoading,
    }
  ] = useCustomActionMutation();

  const isOpenUpdateTask = taskStoreData?.isOpenUpdateTask;
  const taskUpdateData = taskStoreData?.taskUpdateData;
  const notifications = useNotifications();


  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    setTaskName(taskUpdateData?.title);
  }, [taskUpdateData]);


  const handleSave = () => {
    updateTaskMutation({
      url: 'api/task/tasks/' + taskUpdateData?.id,
      body: {
        description: taskName,
      },
      method: "PUT",
    }).then((res: any) => {
      if (res?.error) {
        notifications.show(res?.error?.data?.message);

        return;
      } else {
       
        notifications.show("Görev oluşturuldu", {
          severity: "success",
          autoHideDuration: 2000,
        });
        setData({
          ...taskStoreData,
          isOpenUpdateTask: false,
          isUpdateTask: new Date().getTime(),
        });
      }
    });
  };

  return (
    <Drawer
      open={isOpenUpdateTask}
      onClose={() => {
        setData({
          ...taskStoreData,
          isOpenUpdateTask: false,
        });
      }}
      anchor="right"
    >
      <div className="w-[400px] bg-white h-full pt-20 px-5 flex flex-col">
        <span className="text-lg font-bold">
          Görev Düzenle
        </span>

        <TextField
          value={taskName}
          id="outlined-basic"
          label="Görev Adı"
          variant="outlined"
          sx={{
            marginTop: "20px",
          }}
          color={"#532F7E"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskName(e.target.value)
          }
        />

        <Button
          variant="outlined"
          sx={{
            marginTop: "20px",
            borderColor: "gray",
          }}
          disabled={updateTaskLoading}
          onClick={handleSave}
          color={"gray"}
        >
          Kaydet
        </Button>
      </div>
    </Drawer>
  );
}

export default UpdateTask;
