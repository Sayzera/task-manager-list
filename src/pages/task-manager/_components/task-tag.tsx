import TaskTagItem from "./task-tag-item"
import CloseCircleOutline from '../../../assets/icons/close-circle-outline.svg?react';


function TaskTag() {
  return (
   <div className="flex items-center gap-2">
    <TaskTagItem title="Label Long" icon={CloseCircleOutline} />
    <TaskTagItem title="Label" />
    <TaskTagItem title="Label" />
   </div>
  )
}

export default TaskTag