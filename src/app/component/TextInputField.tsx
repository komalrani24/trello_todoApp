import React from "react";

interface inputType {
  placeholder: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<inputType> = ({ placeholder, ...rest }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className=" my-3 border-[#B7BEC9] border-2 h-10 rounded-md px-1 font-semibold
        hover:border-blue-950"
        {...rest}
      ></input>
    </div>
  );
};

export default TextInputField;
