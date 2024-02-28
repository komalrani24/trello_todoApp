"use client";
import React, { Component, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import AddTask from "./AddTask";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import CreateNewCard from "./CreateNewCard";
import { FaPlus } from "react-icons/fa";
import TextInputField from "./TextInputField";
import EditCard from "./EditCard";

interface data {
  // newId: string;
  id: string | number;

  title: string;
  components: [];
}

const HomePage: React.FC = () => {
  const [card, setCard] = useState<data[]>([]); //for input card
  // const [openEditCard, setOpenEditCard] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "card"), (snapshot) => {
      let itemsData: data[] = [];
      snapshot.forEach((doc) => {
        let id = doc.id;
        console.log(doc.id, "id");
        const data = doc.data(); // Get the data from the document
        const { title, components } = data; // Destructure the data
        itemsData.push({ id, title, components }); // Push the data to itemsData array
      });
      setCard(itemsData);
    });
    return () => unsubscribe();
  }, []);

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
      console.log(item, "item");
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      newData.forEach(async (cardData) => {
        const postDocRef = doc(db, "card", String(cardData.id));
        const updatedFields = { components: cardData.components };
        await updateDoc(postDocRef, updatedFields);
      });

      setCard(newData);
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

  const makeCardList = async (
    index: number | undefined,
    title: string,
    id: number | string
  ) => {
    if (index !== undefined && index >= 0 && index < card.length) {
      const selectedCard: any = card[index];

      selectedCard.components.push({
        name: title,
        id: `id${index}${selectedCard.components.length + 1}`,
      });
      console.log(selectedCard, "after");
      const postDocRef = doc(db, "card", String(id));
      const updatedFields = {
        components: selectedCard.components, // Update components array
      };
      await updateDoc(postDocRef, updatedFields);
    }
  };
  console.log(card, "card");

  const handleDeleteItem = async (id: string | number) => {
    try {
      await deleteDoc(doc(db, "card", String(id)));

      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

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
                        handleDeleteItem={handleDeleteItem}
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
