import { Button, IconButton } from "@mui/material";
import TaskManagerDashboardGridIcon from "../../assets/icons/task-dasboard-grid.svg?react";
import PageHeader from "../../components/page-header";
import { Add, MoreVertSharp } from "@mui/icons-material";
import PageWrapper from "../../components/page-card";
import CircularProgressItem from "../../components/circular-progressbar";

import BoardTaskTypeIcon from "../../assets/icons/board-task-type-icon.svg?react";
import PinkArrowUp from "../../assets/icons/pink-arrow-up.svg?react";
import Filter from "./_components/filter";
import Tasks from "./_components/tasks";
import { useState } from "react";
import CreateTask from "./_components/create-task";

type Props = {};

function TaskManager({}: Props) {
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  return (
    <div>
      <CreateTask open={openTaskDrawer} toggleDrawer={setOpenTaskDrawer} />
      <div className="flex justify-between items-center">
        <PageHeader
          title="Görev Yöneticisi"
          icon={TaskManagerDashboardGridIcon}
        />
        <Button
          variant="outlined"
          startIcon={<Add />}
          sx={{
            borderColor: "gray",
            color: "white",
            backgroundColor: "gray",
          }}
        >
          Yeni Proje
        </Button>
      </div>

      <PageWrapper>
        <div className="flex flex-col space-y-10">
          <div className="flex gap-10">
            <CircularProgressItem percentage={17} text={126} />

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <BoardTaskTypeIcon />
                <span>Enerji ve Tabii Kaynaklar Bakanlığı</span>
              </div>
              <div
                className="
            flex items-center gap-2
            "
              >
                <span className=" text-pink-500 font-bold text-xl">
                  ProjectName 1 (OrganisationBased)
                </span>
                <PinkArrowUp />
              </div>
            </div>

            <div className="flex-1 flex justify-end h-fit">
              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  borderColor: "5246FF",
                  color: "white",
                  backgroundColor: "#5246FF",
                }}
                onClick={() => {
                  setOpenTaskDrawer(true)
                }}
              >
                Yeni Görev
              </Button>

              <IconButton aria-label="delete" size="small">
                <MoreVertSharp fontSize="inherit" />
              </IconButton>
            </div>
          </div>

          <Filter />

          <Tasks />
        </div>
      </PageWrapper>
    </div>
  );
}

export default TaskManager;
