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
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInputField: React.FC<inputType> = ({ placeholder, ...rest }) => {
  return (
    <>
      {
        <input
          type="text"
          placeholder={placeholder}
          className="w-[100px] border-none 
            
           text-[#172B4D] "
          {...rest}
        ></input>
      }
    </>
  );
};

export default TextInputField;
