import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TextInputField from "./TextInputField";

const CreateNewCard = (props: any) => {
  const [showCard, setshowCard] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const addNewcard = () => {
    setshowCard(!showCard);
  };
  const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  console.log(title);

  return (
    <>
      {!showCard ? (
        <div
          className="h-12 w-[200px] bg-[#F1F2F4] py-3 px-8 my-5 rounded-md flex items-center
      justify-between"
          onClick={(e) => {
            e.stopPropagation();
            addNewcard();
          }}
        >
          <span>
            <FaPlus />
          </span>
          Add Card
        </div>
      ) : (
        <div className="flex gap-10 items-center ">
          <TextInputField
            className="border-none h-10 rounded-md p-2"
            placeholder="title"
            value={title}
            onChange={addTitle}
          />

          <div
            className="text-white bg-[#6B7588] p-3 rounded-md h-12 "
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(title);
              setTitle("");
            }}
          >
            Add a card
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewCard;
