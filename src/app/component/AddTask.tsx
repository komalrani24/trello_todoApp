"use client";
import React, { useState } from "react";
import TextInputField from "./TextInputField";
import { RiMenuAddLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

interface titles {
  index?: number;
  id: number;
  title: string;
  components: [];
  makeCardList: (index: number | undefined, title: string) => void; // Define the makeCardList function type
}

const AddTask: React.FC<titles> = ({
  title,
  index,
  components,
  makeCardList,
}) => {
  const [addNewValue, setAddNewValue] = useState<string>("");

  const [showInput, setShowInput] = useState<boolean>(false);

  const showInputField = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <div className="rounded-lg flex flex-col items-start bg-[#F1F2F4] my-10 mx-4 px-6">
        {title}
        {showInput && (
          <TextInputField
            placeholder="task"
            value={addNewValue}
            onChange={(e) => {
              setAddNewValue(e.target.value);
            }}
          />
        )}

        {components.map((item: Components, i: number) => (
          <Draggable draggableId={item.id.toString()} index={i}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps}>
                <>
                  {
                    <div
                      key={i}
                      className="flex  items-center my-3 border-[#B7BEC9]
                       border-2 h-10 -mr-4 rounded-md  font-semibold  hover:border-blue-950 w-[250px]"
                      {...provided.dragHandleProps}
                    >
                      {item.name}
                      {/* <FaPencilAlt className="" /> */}
                    </div>
                  }
                </>
              </div>
            )}
          </Draggable>
        ))}

        <button type="submit">
          <div className="flex gap-4 items-center mb-3 rounded-md pr-4 min-w-[250px] justify-between">
            <div className="text-xl font-bold text-[#42526F] hover:text-white p-3 hover:bg-[#6B7588] rounded-md ">
              <RiMenuAddLine />
            </div>
            {!showInput ? (
              <div
                onClick={showInputField}
                className="text-[#42526F] hover:text-white hover:bg-[#6B7588] p-3 rounded-md"
              >
                Add List
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  makeCardList(index, addNewValue);

                  setAddNewValue("");
                }}
              >
                Add
              </button>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default AddTask;
