import { DragEvent } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {

  title: string;
  count: number;
  children: React.ReactNode;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  className?: string;
};

export const Container = ({ title, count, children, className, ...props }: ContainerProps) => {

  return (
    <div {...props}
         className={cn("bg-[#e7e7e7]/80 dark:bg-[#232323]/80  rounded-sm w-[330px] max-h-[1200px] py-2 px-1 overflow-hidden overflow-y-auto smooth-scroll [&::-webkit-scrollbar]:hidden", className)}>
      <div className={"flex items-center gap-2 uppercase p-4"}>
        <h3 className={"tracking-wider text-sm"}>{title}</h3>
        <p>{count}</p>
      </div>
      <div className={"flex flex-col gap-1"}>{children}</div>
    </div>
  );
};