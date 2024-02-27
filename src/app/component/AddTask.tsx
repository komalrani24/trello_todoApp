"use client";
import React, { useState } from "react";
import TextInputField from "./TextInputField";
import { RiDeleteBin6Line, RiMenuAddLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsThreeDots } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import EditCard from "./EditCard";

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
  const [openEditCard, setOpenEditCard] = useState<boolean>(false);

  const showInputField = () => {
    setShowInput(!showInput);
  };
  const showEditCard = () => {
    setOpenEditCard(!openEditCard);
  };
  const hideEditCard = () => {
    setOpenEditCard(false);
  };

  return (
    <>
      <div
        className="rounded-lg flex flex-col items-start  bg-[#F1F2F4] 
      my-10 mx-4 px-3 py-5 h-fit gap-3"
      >
        <div className="flex items-center justify-between w-full">
          <div className="text-sm font-bold text-[#172B4D]"> {title}</div>

          <div>
            <BsThreeDots className="cursor-pointer" onClick={showEditCard} />
          </div>
        </div>

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

        <div className="flex items-center width-[350px] ">
          {showInput && (
            <>
              <div
                className="flex  items-center my-3 border-[#B7BEC9] border-2 h-10 -mr-4 rounded-md  font-semibold
                 w-[250px] hover:border-[rgb(12,102,228)] px-3 group justify-between"
              >
                <TextInputField
                  placeholder="task"
                  value={addNewValue}
                  onChange={(e) => {
                    setAddNewValue(e.target.value);
                  }}
                />
                <FaPencil className="hidden group-hover:block" />
              </div>
            </>
          )}
        </div>

        <button type="submit">
          <div className="flex gap-4 items-center mb-3  rounded-md pr-4 min-w-[250px] ">
            {!showInput ? (
              <div className="flex items-center hover:bg-[#6B7588] h-8 rounded-md">
                <>
                  <span>
                    <svg
                      className="size-3 "
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

                  <div
                    onClick={showInputField}
                    className="text-[#42526F] hover:text-white   p-3 rounded-md group"
                  >
                    Add List
                  </div>
                </>
              </div>
            ) : (
              // </div>
              <>
                <div className="flex items-center gap-4">
                  <button
                    className="text-[#fff] bg-[rgb(12,102,228)] h-8 w-16 rounded-md"
                    type="submit"
                    onClick={() => {
                      makeCardList(index, addNewValue);

                      setAddNewValue("");
                      setShowInput(false);
                    }}
                  >
                    Add
                  </button>
                  <span onClick={() => {}}>
                    <svg
                      width="24"
                      height="24"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </div>
              </>
            )}
          </div>
        </button>

        {openEditCard && (
          <div className="absolute ">
            <EditCard hideEditCard={hideEditCard} />
          </div>
        )}
      </div>
    </>
  );
};

export default AddTask;
