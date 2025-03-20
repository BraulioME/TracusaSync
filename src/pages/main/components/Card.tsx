import { DragEvent } from "react";
import { CardInterface } from "@/pages/main/interfaces/CardInterface.ts";

type CardProps = {
  card: CardInterface;
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: CardInterface) => void;
};

export const Card = ({ card, handleDragStart }: CardProps) => (
  <div
    draggable
    onDragStart={(e) => handleDragStart(e, card)}
    className={"bg-background hover:bg-background/70 transition-colors duration-300  rounded-sm cursor-move  shadow-md"}

  >
    <div className={"p-4 flex flex-col gap-4 "}>
      <h4>{card.content.title}</h4>
      <div className={"flex gap-1 bg-[#cecece] dark:bg-[#3b3b3b]  w-fit rounded-sm px-1 items-center"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={"fill-base-primary"}
             viewBox="0 0 256 256">
          <path
            d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
        </svg>
        <p className={"uppercase tracking-wide text-sm"}>{card.content.due_date}</p>
      </div>
      <div className={"flex justify-between items-center"}>
        <div className={"flex gap-1"}>
          <svg xmlns="http://www.w3.org/2000/svg"
               className={"bg-[#4bade8] p-1 fill-white rounded-sm w-5 h-5"}
               viewBox="0 0 256 256">
            <path
              d="M243.31,90.91l-128.4,128.4a16,16,0,0,1-22.62,0l-71.62-72a16,16,0,0,1,0-22.61l20-20a16,16,0,0,1,22.58,0L104,144.22l96.76-95.57a16,16,0,0,1,22.59,0l19.95,19.54A16,16,0,0,1,243.31,90.91Z"></path>
          </svg>
          <p className={"text-sm"}>{card.content.id}</p>
        </div>
        <img src={card.content.assignee} className={"w-8 h-8 rounded-full"} />
      </div>
    </div>
  </div>
);
