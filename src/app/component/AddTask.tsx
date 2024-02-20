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
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };
  const showInputField = () => {
    // setShowInput(!showInput);
  };
  const handleShow = (): void => {
    if (inputValue.length === 0) {
      alert("input field should not be empty");
    } else {
      setAddValue((prev: any) => [...prev, inputValue]);
      setInputValue("");
    }
  };
  console.log(addValue, "find");

  return (
    <>
      <div className="rounded-lg flex flex-col items-start bg-[#F1F2F4] my-10 mx-4 px-6">
        {title}
        {/* {showInput && (
          <TextInputField
            placeholder="task"
            value={inputValue}
            onChange={handleChange}
          />
        )}
        {addValue.map((item) => (
          
        ))} */}

        {/* {!showInput && ( */}
        <>
          {components.map((item, i) => (
            <Draggable key={item.id} draggableId={item.id.toString()} index={i}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <TextInputField
                    onChange={(e) => handleChange(e)}
                    value={inputValue}
                    {...provided.dragHandleProps}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </>
        {/* )} */}

        <button type="submit">
          <div
            className="flex gap-4 items-center mb-3  
          rounded-md pr-4 min-w-[250px] justify-between"
            //
          >
            <div
              className="text-xl font-bold text-[#42526F] hover:text-white 
            p-3 hover:bg-[#6B7588] rounded-md "
            >
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
              <button type="submit" onClick={handleShow}>
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
