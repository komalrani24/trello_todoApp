import React from "react";

interface inputType {
  placeholder: string;
  name?: string;
  value?: string;
}

const TextInputField: React.FC<inputType> = ({ placeholder }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className=" my-3 border-[#B7BEC9] border-2 h-10 rounded-md px-1 font-semibold
        hover:border-blue-950"
      ></input>
    </div>
  );
};

export default TextInputField;
