import React from "react";
// import { FaPencilAlt } from "react-icons/fa";
interface inputType {
  placeholder?: string;
  name?: string;
  value?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInputField: React.FC<inputType> = ({ placeholder, ...rest }) => {
  console.log({ ...rest }, "pass");
  return (
    <div
      className="flex items-center my-3 border-[#B7BEC9] border-2 h-10 -mr-4 rounded-md  font-semibold
    hover:border-blue-950 w-[250px]"
      draggable="true"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-[200px] border-none  bg-[#F1F2F4] focus:outline-none pl-3"
        {...rest}
      ></input>
      {/* <FaPencilAlt className="" /> */}
    </div>
  );
};

export default TextInputField;
