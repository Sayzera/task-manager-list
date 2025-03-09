
type PageHeaderProps = {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const PageHeader = ({ title, icon: Icon }: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <Icon />
      <span className="font-bold text-xl">{title}</span>
    </div>
  );
};

export default PageHeader;
