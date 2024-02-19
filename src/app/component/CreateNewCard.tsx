import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TextInputField from "./TextInputField";
import AddTask from "./AddTask";

const CreateNewCard = (props: any) => {
  const [showCard, setshowCard] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const addNewcard = () => {
    setshowCard(!showCard);
    console.log();
  };
  const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  console.log(title);
  return (
    <>
      <div
        className="h-12 w-[200px] bg-[#F1F2F4] py-3 px-8 my-5 rounded-md flex items-center
      justify-between"
        onClick={addNewcard}
      >
        <span>
          <FaPlus />
        </span>
        Add Card
      </div>
      {showCard && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={addTitle}
          ></input>
          <div
            className=" hover:text-white bg-[#6B7588] p-3 rounded-md"
            onClick={props.addValueOnCard}
          >
            Add a card
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewCard;
