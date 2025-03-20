import { Container } from "@/pages/main/components/Container.tsx";
import { DragEvent, useState } from "react";
import { CardInterface } from "@/pages/main/interfaces/CardInterface.ts";
import { Card } from "@/pages/main/components/Card.tsx";

export const TaskBoard = () => {
  const [cards, setCards] = useState<CardInterface[]>([
    {
      id: 1,
      content: {
        id: "RMA-321",
        title: "Tickets BM",
        assignee: "https://secure.gravatar.com/avatar/bb0e5bfea646a6e15c8ea2bfe6f73476?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FBE-1.png",
        due_date: "31 mar"
      },
      container: "A"
    },
    {
      id: 2,
      content: {
        id: "RMA-321",
        title: "Tickets FS",
        assignee: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/610991ee4e8d8d006985a9e6/37ef2f7d-c06b-483c-9987-1697c7097706/128",
        due_date: "31 mar"
      },
      container: "A"
    },
    {
      id: 3,
      content: {
        id: "RMA-321",
        title: "Tickets FS",
        assignee: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/610991ee4e8d8d006985a9e6/37ef2f7d-c06b-483c-9987-1697c7097706/128",
        due_date: "31 mar"
      },
      container: "A"
    },
    {
      id: 4,
      content: {
        id: "RMA-321",
        title: "Tickets BM",
        assignee: "https://secure.gravatar.com/avatar/bb0e5bfea646a6e15c8ea2bfe6f73476?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FBE-1.png",
        due_date: "31 mar"
      },
      container: "A"
    }
  ]);

  const [draggedCard, setDraggedCard] = useState<CardInterface | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardInterface) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetContainer: CardInterface["container"]) => {
    e.preventDefault();

    if (!draggedCard) return;

    const updateCards = cards.map(card => card.id === draggedCard.id ? { ...card, container: targetContainer } : card);

    setCards(updateCards);
    setDraggedCard(null);

    console.log(`Tarjeta movida a contenedor ${targetContainer}`);
  };

  return (
    <div className={"flex gap-4 "}>

      <Container title={"Por Hacer"} className={"flex flex-col "}
                 count={cards.filter(card => card.container === "A").length}
                 onDrop={(e) => handleDrop(e, "A")} onDragOver={(e) => e.preventDefault()}>
        {cards.filter(card => card.container === "A").map(card =>
          <Card key={card.id} card={card} handleDragStart={handleDragStart} />
        )}
        <div
          className={"hover:bg-background flex rounded-sm flex items-center gap-2 p-2 transition-colors duration-200 hover:cursor-pointer"}>

          <svg xmlns="http://www.w3.org/2000/svg" className={"w-4 h-4 dark:fill-base-primary"}
               viewBox="0 0 256 256">
            <path
              d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
          </svg>
          <p className={"text-sm"}>Crear Tarea</p>
        </div>
      </Container>


      <Container title={"Validando"} count={cards.filter(card => card.container === "B").length}
                 onDrop={(e) => handleDrop(e, "B")} onDragOver={(e) => e.preventDefault()}>
        {cards.filter(card => card.container === "B").map(card =>
          <Card key={card.id} card={card} handleDragStart={handleDragStart} />
        )}
      </Container>

      <Container title={"Terminado"} count={cards.filter(card => card.container === "C").length}
                 onDrop={(e) => handleDrop(e, "C")} onDragOver={(e) => e.preventDefault()}>
        {cards.filter(card => card.container === "C").map(card =>
          <Card key={card.id} card={card} handleDragStart={handleDragStart} />
        )}
      </Container>

    </div>
  );
};