"use client";
import React, {
  Component,
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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

interface data {
  // newId: string;
  id: string | number;

  title: string;
  components: [];
}

const HomePage: React.FC = () => {
  const [card, setCard] = useState<data[]>([]); //for input card
  // const [openEditCard, setOpenEditCard] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getIndexOfCard, setGetIndexofCard] = useState<number | undefined>();

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
      // console.log(item, "item");
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
  //           editable: true,
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
    if (title.trim() === "") {
      alert("list cannot be empty!");
      return; // Exit the function if title is empty
    }
    if (index !== undefined && index >= 0 && index < card.length) {
      const selectedCard: any = card[index];
      if (
        selectedCard.components.some(
          (component: any) => component.name === title
        )
      ) {
        alert("Title must be unique!");
        return; // Exit the function if title already exists
      }

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
  // console.log(card, "card");

  const handleDeleteItem = async (id: string | number) => {
    try {
      await deleteDoc(doc(db, "card", String(id)));

      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  //let mouseDown = false;
  useEffect(() => {
    let mouseDown = false;
    let startX = 0,
      scrollLeft = 0;
    const slider = document.querySelector(".parent") as HTMLElement;
    const startDragging = (e: any) => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = (e: any) => {
      mouseDown = false;
    };
    const move = (e: any) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    };
    // Add the event listeners
    slider.addEventListener("mousemove", move, false);
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);

    return () => {
      slider.removeEventListener("mousemove", move, false);
      slider.removeEventListener("mousedown", startDragging, false);
      slider.removeEventListener("mouseup", stopDragging, false);
      slider.removeEventListener("mouseleave", stopDragging, false);
    };
  }, []);
  // for edit title
  const editTitleforCard = (i: number | undefined) => {
    // console.log(i, "cardIndex");
    setGetIndexofCard(i);
    setIsEdit(true);
  };
  //for onChange handler
  // const updateTitleforCard = (e: any, index: any) => {
  //   console.log(e, index, "events");
  //   setCard((prev) => [
  //     ...prev.slice(0, index),

  //     {
  //       ...card[index],
  //       title: e.target.value,
  //     },
  //     ...prev.slice(index + 1),
  //   ]);
  // };
  console.log(card, "cardss");
  const updateTitleforCard = async (e: any, index: any) => {
    const docRef = doc(db, "card", String(card[index].id));

    // Update the data in Firestore
    try {
      await updateDoc(docRef, {
        title: e.target.value, // Update the 'title' field with the new value
        // You can update other fields similarly if needed
      });

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <div className="parent">
      <DragDropContext onDragEnd={onDragEnd}>
        <h1
          className="text-center font-bold text-2xl text-[#fff] bg-[#4D5D77] h-12 
        flex items-center justify-center p-4 fixed w-full top-0 "
        >
          TODO LIST
        </h1>

        <div
          className="flex flex-row-reverse justify-end w-fit mt-10 "
          // ref={ref}
        >
          <div className="mt-5 mx-4">
            <CreateNewCard onClick={addValueNewCard} />
          </div>

          {/* <TextInputField onChange={(e) => e.target.value} /> */}

          <div className="flex">
            {card.length &&
              card.map((item, index) => (
                <Droppable droppableId={`droppable${item.id}`} key={index}>
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
                        editTitleforCard={editTitleforCard}
                        isEdit={isEdit}
                        getIndexOfCard={getIndexOfCard}
                        saveTitleforCard={updateTitleforCard}
                        // updatedTitle={updatedTitle}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
