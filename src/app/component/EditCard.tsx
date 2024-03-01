import React, { useEffect, useRef, useState } from "react";
import { MdOutlineModeEdit, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const EditCard = (props: any) => {
  const editModel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (editModel.current && !editModel.current.contains(e.target as Node)) {
        console.log("clicked outside");
        props.hideEditCard();
      } else {
        console.log("clicked inside");
        console.log(editModel.current, "current element");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [editModel]);

  

  return (
    <div
      className="rounded-lg flex flex-col items-start  bg-[#FFFFFF] 
     mx-4  h-fit gap-3 w-[250px] py-3"
      ref={editModel}
    >
      <div className="flex items-center w-full justify-between  px-3">
        <h1
          className="  w-[50%]  flex items-center justify-end text-[#42526F] 
        h-8  text-sm font-bold  "
        >
          List Action
        </h1>
        <span className="h-8 w-[50%] justify-end  cursor-pointer px-1  flex items-center ">
          <RxCross1
            onClick={props.hideEditCard}
            className="align-right text-[#42526F] hover:bg-[#091E4224] 
            size-4 h-8 w-8 p-2 rounded-md  "
          />
        </span>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <ul>
          <div
            className="flex items-center justify-between hover:bg-[#091E4224]
           h-8 px-3 text-sm font-normal"
          >
            <li>Edit</li>
            <span>
              <MdOutlineModeEdit />
            </span>
          </div>

          <div
            className="flex items-center justify-between hover:bg-[#091E4224]
        h-8 px-3 text-sm font-normal "
            onClick={props.handleDeleteItem}
          >
            <li>Delete</li>
            <span>
              <RiDeleteBin5Line />
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default EditCard;
