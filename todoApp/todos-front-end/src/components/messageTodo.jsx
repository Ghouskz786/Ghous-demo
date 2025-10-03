import React from "react";
import style from "./messageTodo.module.css";
import { useContext } from "react";
import { todoContext } from "../store/storeItems";
const messageTodo = () => {
  const { Hidden } = useContext(todoContext);
  return (
    <div className={style.message}>
      {Hidden
        ? "You Are Viewing Present Todos Only"
        : "You Are Viewing All Todos"}
    </div>
  );
};

export default messageTodo;
