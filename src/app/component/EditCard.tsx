import React, { useState } from "react";
import { MdOutlineModeEdit, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const EditCard = (props: any) => {
  return (
    <div
      className="rounded-lg flex flex-col items-start  bg-[#F1F2F4] 
     mx-4  h-fit gap-3 w-[250px] py-3 "
    >
      <h1 className="flex items-center justify-center bg-[#a7b3c9] text-[#42526F] h-8 w-full font-bold text-md text-[]">
        {" "}
        List Action{" "}
        <span className="ml-5 cursor-pointer">
          <RxCross1 onClick={props.hideEditCard} />
        </span>
      </h1>
      <div className="flex flex-col gap-8 w-full">
        <ul>
          <div
            className="flex items-center justify-between hover:bg-[#6B7588]
          hover:text-[white] h-8 px-3"
          >
            <li>Edit</li>
            <span>
              <MdOutlineModeEdit />
            </span>
          </div>
          <div
            className="flex items-center justify-between hover:bg-[#6B7588]
          hover:text-[white] h-8 px-3"
          >
            <li>Update</li>
            <span>
              <MdOutlineTipsAndUpdates />
            </span>
          </div>
          <div
            className="flex items-center justify-between hover:bg-[#6B7588]
          hover:text-[white] h-8 px-3"
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
