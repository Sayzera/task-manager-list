import { Button, Drawer, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCustomActionMutation } from "../../../redux/api";
import { EndpointList } from "../../../redux/endpointList";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/mainSlice";
import { useNotifications } from "@toolpad/core";
import { useTaskManagmentStore } from "../../../zustand/taskStore";

type Props = {
  open: boolean;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateTask({ open, toggleDrawer }: Props) {
  const {
    data: taskStoreData,
    setData
  } = useTaskManagmentStore();
  const notifications = useNotifications();


  console.log(taskStoreData, 'taskStoreData')
  const userData = useSelector(selectUserData);
  const userId = userData?.token?.id;

  const [taskName, setTaskName] = useState<string>("");
  const [createTaskMutation, { isLoading: createTaskLoading }] =
    useCustomActionMutation();
  const handleSave = () => {
    createTaskMutation({
      url: EndpointList.CREATE_TASK,
      body: {
        description: taskName,
        completed: false,
        sortNumber: 0,
        owner: userId,
      },
    }).then((res: any) => {
      if (res?.error) {
        notifications.show(res?.error?.data?.message);
        
        return;
      } else {
        setData({
          ...taskStoreData,
          isCreateTask: new Date().getTime(),

        });
        notifications.show("Görev oluşturuldu", {
          
          severity: "success",
          autoHideDuration: 2000,
        });
        toggleDrawer(false);
      }
    });
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
      anchor="right"
    >
      <div className="w-[400px] bg-white h-full pt-20 px-5 flex flex-col">
        <span className="text-lg font-bold">Yeni Görev Oluştur</span>

        <TextField
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
          disabled={createTaskLoading}
          onClick={handleSave}
          color={"gray"}
        >
          Kaydet
        </Button>
      </div>
    </Drawer>
  );
}

export default CreateTask;
