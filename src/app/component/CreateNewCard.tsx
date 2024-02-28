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
        <>
          <div
            className="h-12 w-[200px] bg-[#fff] py-3 px-3 my-5  
           font-bold text-[#475673] cursor-pointer rounded-[12px] flex items-center
          gap-3"
            onClick={(e) => {
              e.stopPropagation();
              addNewcard();
            }}
          >
            <span>
              <svg
                className="size-5"
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            Add Another List
          </div>
        </>
      ) : (
        <div className=" w-[300px]  bg-[#fff] my-5 rounded-md flex flex-col gap-3 px-3 ">
          <TextInputField
            className=" h-10 rounded-md p-2 text-sm text-[#172B4D] border-2 mt-3
             hover:border-[rgb(12,102,228)]"
            placeholder="title"
            value={title}
            onChange={addTitle}
          />

          <div className="flex">
            <div
              className="text-white bg-[rgb(12,102,228)] flex items-center mx-2
            rounded-md h-10 pl-1 w-24 mb-3 "
              onClick={(e) => {
                e.stopPropagation();
                props.onClick(title);
                setTitle("");
              }}
            >
              Add a card
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewCard;
