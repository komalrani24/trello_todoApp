"use client";
import React, { Component, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref } from "firebase/storage";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import AddTask from "./AddTask";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import CreateNewCard from "./CreateNewCard";
import { FaPlus } from "react-icons/fa";
import TextInputField from "./TextInputField";

interface data {
  id: number;
  title: string;
  components: [];
}

const HomePage: React.FC = () => {
  const [card, setCard] = useState<data[]>([]); //for input card
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "card"), (snapshot) => {
      let itemsData: data[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data(); // Get the data from the document
        const { id, title, components } = data; // Destructure the data
        itemsData.push({ id, title, components }); // Push the data to itemsData array
      });
      setCard(itemsData);
    });
    return () => unsubscribe();
  }, []);
  // const fetchData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "card"));
  //   const newData: data[] = [];
  //   querySnapshot.forEach((doc) => {
  //     let obj: any = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     newData.push(obj);
  //   });
  //   setCard(newData);
  //   console.log(newData, "search");
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // console.log(source, "source");

    if (!destination) return;
    // console.log(destination, "destination");
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(card))]; //shallow copy concept
      // console.log(newData, "newdata");
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      console.log(oldDroppableIndex, "oldIndex");
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      console.log(item);
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setCard([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(card))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setCard([...newData]);
    }
  };

  // const addValueNewCard = (title: string) => {
  //   if (title.trim()) {
  //     const isUnique = card.every((item) => item.title !== title);
  //     if (isUnique)
  //       setCard((prev) => [
  //         ...prev,
  //         {
  //           id: card.length + 1,
  //           title: title,
  //           components: [],
  //         },
  //       ]);
  //     else {
  //       alert("title should be unique");
  //     }
  //   } else {
  //     alert("title should not be empty");
  //   }
  // };

  //store data on firebase
  const addValueNewCard = async (title: string) => {
    if (title.trim()) {
      const isUnique = card.every((item) => item.title !== title);
      let obj = {
        title: title,
        components: [],
      };
      if (isUnique) {
        try {
          let res = await addDoc(collection(db, "card"), obj);
        } catch (error) {}
      } else {
        alert("title should be unique");
      }
    } else {
      alert("title should not be empty");
    }
  };

  const makeCardList = (index: number | undefined, title: string) => {
    if (index !== undefined && index >= 0 && index < card.length) {
      setCard((prev: any) => [
        ...prev.slice(0, index),
        {
          ...prev[index],
          components: [
            ...prev[index].components,
            {
              name: title,
              id: prev[index].components.length + 1,
            },
          ],
        },
        ...prev.slice(index + 1),
      ]);
    }
  };
  console.log(card, "card");

  // const addData = async () => {
  //   try {
  //     let res = await addDoc(collection(db, "card"), { name: item });
  //     setItem("");
  //     console.log(res, "response");
  //   } catch (error) {}
  // };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1
          className="text-center font-bold text-2xl text-[#fff] bg-[#4D5D77] h-12 
        flex items-center justify-center p-4"
        >
          TODO LIST
        </h1>

        <div className="flex flex-row-reverse justify-end w-fit">
          <div className="mt-5">
            <CreateNewCard onClick={addValueNewCard} />
          </div>

          {/* <TextInputField onChange={(e) => e.target.value} /> */}

          <div className="flex">
            {card.length &&
              card.map((item, index) => (
                <Droppable droppableId={`droppable${item.id}`}>
                  {(provided) => (
                    <div
                      key={index}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <AddTask
                        id={item.id}
                        index={index}
                        title={item.title}
                        makeCardList={makeCardList}
                        components={item.components}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default HomePage;
