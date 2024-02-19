"use client";
import React, { useEffect, useState } from "react";

import Table from "./AddTask";
import AddTask from "./AddTask";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
// import { dataCards } from "../utils/data";
import CreateNewCard from "./CreateNewCard";
import { FaPlus } from "react-icons/fa";

interface data {
  id: number;
  title: string;
  components: Components[];
}
const addNewcard = () => {};
const HomePage: React.FC = () => {
  const [card, setCard] = useState<data[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // console.log(source, "source");

    if (!destination) return;
    // console.log(destination, "destination");
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(card))]; //shallow copy concept
      // console.log(newData, "newdata");
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      console.log(oldDroppableIndex, "oldIndex");
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      console.log(item);
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setCard([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(card))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setCard([...newData]);
    }
  };
  console.log(card);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="text-center font-bold text-2xl text-[#fff] bg-[#4D5D77] h-12 flex items-center justify-center p-4">
          TODO LIST
        </h1>
        <CreateNewCard addNewcard={addNewcard} />
        <div className="flex">
          <div className="flex">
            {card.length &&
              card.map((item, index) => (
                <Droppable droppableId={`droppable${item.id}`}>
                  {(provided) => (
                    <div
                      key={index}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <AddTask
                        id={item.id}
                        title={item.title}
                        components={item.components}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default HomePage;
