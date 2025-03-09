import { Delete } from "@mui/icons-material";
import { useCustomActionMutation } from "../../../redux/api";
import { useTaskManagmentStore } from "../../../zustand/taskStore";
import { useNotifications } from "@toolpad/core";

type Props = {
  id: string;
};

function DeleteItem({ id }: Props) {
  const { setData, data } = useTaskManagmentStore();
  const [deleteTask] = useCustomActionMutation();
    const notifications = useNotifications();

  return (
    <Delete
      className="cursor-pointer text-red-500"
      onClick={() => {
        deleteTask({
          url: "api/task/tasks/" + id,
          method: "DELETE",
        }).then((res: any) => {
            if (res?.error) {
                return;
            }
            notifications.show("Görev silindi", {
                severity: "success",
                autoHideDuration: 2000,
            });
            setData({
                ...data,
                isDeleteTask: new Date().getTime(),
            });
        })
      }}
    />
  );
}

export default DeleteItem;
