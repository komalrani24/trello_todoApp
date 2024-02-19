"use client";
import React, { useState } from "react";
import TextInputField from "./TextInputField";
import { RiMenuAddLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

interface titles {
  id: number;
  title: string;
  components: Components[];
}

const AddTask: React.FC<titles> = ({ title, id, components }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [addValue, setAddValue] = useState<JSX.Element[]>([]);
  // const [showInput, setShowInput] = useState<boolean>(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setInputValue(e.currentTarget.value);
  // };

  // const handleAdd = (): void => {
  //   if (inputValue.length === 0) {
  //     alert("input field should not be empty");
  //   } else {
  //     setAddValue((prev: any) => [...prev, inputValue]);
  //     setInputValue("");
  //   }
  // };
  // console.log(inputValue, "hsjkhjfs");

  return (
    <>
      <div className="rounded-lg flex flex-col items-start bg-[#F1F2F4] my-10 mx-4 px-6">
        {title}
        <ul>
          {components.map((item, i) => (
            <Draggable key={item.id} draggableId={item.id.toString()} index={i}>
              {(provided) => (
                <li
                  className="flex items-center my-3 border-[#B7BEC9] border-2 h-10 -mr-4 rounded-md  font-semibold
                  hover:border-blue-950 w-[250px] text-[#42526F] "
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  {item.name}
                </li>
              )}
            </Draggable>
          ))}
        </ul>

        <button type="submit">
          <div
            className="flex gap-4 items-center mb-3  
          rounded-md pr-4 min-w-[250px] justify-between"
            // onClick={handleAdd}
          >
            <div
              className="text-xl font-bold text-[#42526F] hover:text-white 
            p-3 hover:bg-[#6B7588] rounded-md "
            >
              <RiMenuAddLine />
            </div>
            <div className="text-[#42526F] hover:text-white hover:bg-[#6B7588] p-3 rounded-md">
              Add a card
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default AddTask;
