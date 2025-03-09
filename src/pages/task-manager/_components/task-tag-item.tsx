interface TaskTagItemProps {
  title: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
function TaskTagItem({ title, icon: Icon }: TaskTagItemProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="bg-[#F2f2f2] px-2 rounded-md text-gray-600 flex items-center gap-2 py-1">
          <span>{title}</span>
          {Icon && <Icon />}
        </div>
      </div>
    </div>
  );
}

export default TaskTagItem;
