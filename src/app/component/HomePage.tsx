import React from "react";
import Table from "./AddTask";
import AddTask from "./AddTask";

const HomePage: React.FC = () => {
  return (
    <>
      <h1 className="text-center font-bold text-2xl text-[#fff] bg-[#4D5D77] h-12 flex items-center justify-center p-4">
        TODO LIST
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* add task */}
        <AddTask title={"AddTask"} />
        <AddTask title={"Done"} />
        <AddTask title={"Doing"} />
        <AddTask title={"Bugs"} />

        {/* Done */}
        {/* <Done /> */}
        {/* pending */}
        {/* <Pending /> */}

        {/* bugs */}
        {/* <Bugs /> */}
      </div>
    </>
  );
};

export default HomePage;
