"use client";
import React, { useEffect, useState } from "react";

import Table from "./AddTask";
import AddTask from "./AddTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { dataCards } from "../utils/data";

interface data {
  id: number;
  title: string;
  components: Components[];
}

const HomePage: React.FC = () => {
  const [card, setCard] = useState<data[]>(dataCards);

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <h1 className="text-center font-bold text-2xl text-[#fff] bg-[#4D5D77] h-12 flex items-center justify-center p-4">
          TODO LIST
        </h1>

        <div className="flex">
          {/* add task */}

          <div>
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
          {/* <div>
            <AddTask title={"Done"} />
          </div>
          <div>
            <AddTask title={"Doing"} />
          </div>
          <div>
            <AddTask title={"Bugs"} />
          </div>*/}
        </div>
      </DragDropContext>
    </>
  );
};

export default HomePage;
