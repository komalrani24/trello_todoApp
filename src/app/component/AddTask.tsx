"use client";
import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import TextInputField from "./TextInputField";
import { RiDeleteBin6Line, RiMenuAddLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsThreeDots } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import EditCard from "./EditCard";
import { RxCross1 } from "react-icons/rx";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface titles {
  index?: number;
  id: number | string;
  title: string;
  components: [];
  makeCardList: (
    index: number | undefined,
    title: string,
    id: string | number
  ) => void; // Define the makeCardList function type
  handleDeleteItem: (id: string | number) => Promise<void>;
  editTitleforCard: (index: number | undefined) => void;
  isEdit: boolean;
  getIndexOfCard: number | undefined;
  saveTitleforCard: (e: ChangeEvent, index: number | undefined) => void;
  // updatedTitle: string;
}

const AddTask: React.FC<titles> = ({
  title,
  index,
  id,
  components,
  makeCardList,
  handleDeleteItem,
  editTitleforCard,
  isEdit,
  getIndexOfCard,
  saveTitleforCard,
  // updatedTitle,
}) => {
  const [addNewValue, setAddNewValue] = useState<string>("");
  // console.log(id, "id");

  const [showInput, setShowInput] = useState<boolean>(false);
  const [openEditCard, setOpenEditCard] = useState<boolean>(false);

  const showInputField = () => {
    setShowInput(!showInput);
    // console.log(showInput, "sddjsd");
  };
  const showEditCard = () => {
    setOpenEditCard(!openEditCard);
  };
  const hideEditCard = () => {
    setOpenEditCard(false);
  };

  console.log(index, "ghdhgjh");
  return (
    <>
      <div
        className="rounded-[12px] flex flex-col items-start  bg-[#F1F2F4] shadow-raised
      my-10 ml-4 px-3 py-2 h-fit gap-2  "
      >
        <div className="flex items-center justify-between w-full ">
          {isEdit && index === getIndexOfCard ? (
            <div
              className="text-sm font-bold my-3
        rounded-md text-[#172B4D] w-full h-8 flex items-center pl-1 bg-transparent"
            >
              <TextInputField
                onChange={(e) => saveTitleforCard(e, index)}
                className="w-full   rounded-lg border-[#374866] bg-transparent
              h-10"
              />
            </div>
          ) : (
            <div
              className="text-sm font-bold
            rounded-md text-[#172B4D] w-full h-8 flex items-center pl-1"
              onClick={() => editTitleforCard(index)}
            >
              {title}
            </div>
          )}

          <div className="flex items-center justify-center">
            <BsThreeDots
              className="cursor-pointer text-[#6A768C] hover:bg-[#091E4224]
               h-8 w-8 p-2 rounded-md"
              onClick={showEditCard}
            />
          </div>
          {/* <button onClick={editTitle}>edit</button> */}
          {/* <button>delete</button> */}
        </div>
        {/* <div className="max-h-[500px] overflow-y-auto "> */}
        {components.map((item: Components, i: number) => (
          <Draggable draggableId={item.id.toString()} index={i} key={item.id}>
            {(provided, snapshot) => {
              // console.log(snapshot, "snapshot");
              const isDragging = snapshot.isDragging;
              // console.log(isDragging, "dragging");
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  // className={}
                  className={`w-full relative`}
                >
                  <div
                    className={`flex items-center my-1 border-transparent 
                    bg-[#ffff] border-2 h-10 -mr-4 rounded-xl overflow-y:auto
                     hover:border-[#374866] text-[#2F415F] text-sm 
                      justify-between group w-[250px] px-3 font-medium 
                      shadow-raised hover:border-2 relative  ${
                        isDragging ? "transform skew-y-3 ... bg-white  " : ""
                      } `}
                    {...provided.dragHandleProps}
                  >
                    {item.name}

                    <FaPencil
                      className={`hidden group-hover:block text-[#6A768C]`}
                    />
                  </div>
                  <div
                    className={`absolute w-full h-12 top-0 -z-10 bg-[white] opacity-[0.5]
                    ${isDragging ? "flex " : "hidden"} `}
                  ></div>
                </div>
              );
            }}
          </Draggable>
        ))}

        <div className="flex items-center width-[350px] ">
          {showInput && (
            <>
              <div
                className="flex items-center my-1 border-transparent
                bg-[#ffffff] border-2 h-10 -mr-4
                 text-[#2F415F]  justify-between
                text-sm hover:border-[#374866] group rounded-xl
                  hover:border-2 w-[250px] px-3 font-normal shadow-raised"
              >
                <TextInputField
                  className="bg-transparent text-sm  border-none w-[150px] 
                  
                   focus:outline-none text-[#44546F]"
                  placeholder="Enter title for this Card..."
                  value={addNewValue}
                  onChange={(e) => {
                    setAddNewValue(e.target.value);
                  }}
                />
                <FaPencil className="hidden group-hover:block text-[#6A768C]" />
              </div>
            </>
          )}
        </div>

        <button type="submit">
          <div className="flex gap-4 items-center rounded-md min-w-[250px] ">
            {showInput ? (
              <>
                <div className="flex items-center gap-4 w-full">
                  <button
                    className="text-[#fff] bg-[rgb(12,102,228)] h-8 w-[40%] rounded-md"
                    type="submit"
                    onClick={() => {
                      makeCardList(index, addNewValue, id);

                      setAddNewValue("");
                      setShowInput(false);
                    }}
                  >
                    Add card
                  </button>
                  <span
                    className="h-8 w-8 rounded-md flex items-center justify-center
                  hover:bg-[#6B7588] "
                    onClick={() => {
                      setShowInput(false);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-[#172B4D]"
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
            ) : (
              <div
                className="flex items-center  h-8
           rounded-md justify-start w-full  font-bold 
           transition-colors duration-85 ease-in-out"
              >
                <>
                  <div className="flex items-center justify-between w-full ">
                    <div
                      className="flex items-center hover:bg-[#091E4224] w-full
                       rounded-md h-8 p-3 overflow-hidden"
                    >
                      <span>
                        <svg
                          className="size-4 text-[#44546F]  "
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
                        className="text-[#44546F] text-sm p-3 rounded-md group "
                      >
                        Add a Card
                      </div>
                    </div>
                    <span
                      className="text-[#6A768C]  flex items-center hover:bg-[#091E4224]
                rounded-md p-2"
                    >
                      <svg
                        width="20"
                        height="20"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6V5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5H5V6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6Z"
                          fill="currentColor"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6 8C6 6.89543 6.89543 6 8 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H8C6.89543 20 6 19.1046 6 18V8ZM8 8H19V14H8V8ZM18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18ZM8 17C8 17.5523 8.44772 18 9 18H12C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16H9C8.44772 16 8 16.4477 8 17Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M4 14C3.44772 14 3 14.4477 3 15V16C3 17.1046 3.89543 18 5 18V15C5 14.4477 4.55228 14 4 14Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M3 9C3 8.44772 3.44772 8 4 8C4.55228 8 5 8.44772 5 9V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V9Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M8 4C8 3.44772 8.44772 3 9 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H9C8.44772 5 8 4.55228 8 4Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H19C19 3.89543 18.1046 3 17 3H16Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </>
              </div>
            )}
          </div>
        </button>
        {/* </div> */}

        {openEditCard && (
          <div className="absolute top-[2rem] left-[15rem] rounded-md z-50 ">
            <EditCard
              hideEditCard={hideEditCard}
              handleDeleteItem={() => {
                handleDeleteItem(id);
              }}
              // checkIfClickedOutside={checkIfClickedOutside}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AddTask;
