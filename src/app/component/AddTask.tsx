"use client";
import React, { useState } from "react";
import TextInputField from "./TextInputField";

interface titles {
  title: String;
}

const AddTask: React.FC<titles> = ({ title }) => {
  const [inputCard, setInputCard] = useState<JSX.Element[]>([]);

  // const handleAdd = () => {
  //   setInputCard((prevTasks) => [
  //     ...prevTasks,
  //     <TextInputField key={inputCard.length} placeholder="enter task" />,
  //   ]);
  // };

  const handleAdd=()=>{
    

  }
  return (
    <>
      <div className="rounded-lg flex flex-col items-start bg-[#F1F2F4] my-10 mx-4 px-6">
        <h1 className="text-[#42526F] mt-3">{title}</h1>

        {title === "AddTask" && <TextInputField placeholder="enter task" />}

        <button type="submit">
          <div
            className="flex gap-4 items-center mb-3 hover:bg-[#6B7588]  
          rounded-md pr-4 "
            onClick={handleAdd}
          >
            <span className="text-xl font-bold text-[#42526F] hover:text-white">
              +
            </span>
            <span className="text-[#42526F] hover:text-white">Add a card</span>
          </div>
        </button>
      </div>
      {inputCard}
    </>
  );
};

export default AddTask;
