import React from "react";
import style from "./message.module.css";
import { useContext } from "react";
import { todoContext } from "../store/storeItems";
const message = () => {
  const { todos } = useContext(todoContext);
  return (
    <>
      {todos.length === 0 && (
        <div className={`${style.message}`}>Enjoy your day</div>
      )}
    </>
  );
};

export default message;
