import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaPencilAlt } from "react-icons/fa";
interface inputType {
  placeholder?: string;
  name?: string;
  value?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const TextInputField: React.FC<inputType> = ({ placeholder, ...rest }) => {
  return (
    <>
      {
        <input
          type="text"
          placeholder={placeholder}
          className="w-[100px] border-none  bg-[#F1F2F4] focus:outline-none text-sm text-[#6D7A8F] "
          {...rest}
        ></input>
      }
    </>
  );
};

export default TextInputField;
