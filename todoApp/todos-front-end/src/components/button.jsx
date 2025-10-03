import React from "react";
import style from "./button.module.css";
import { useContext } from "react";
import { todoContext } from "../store/storeItems";
const button = () => {
  const { handleHiddenTodos, Hidden } = useContext(todoContext);
  return (
    <button
      type="button"
      className={`btn btn-info ${style.button}`}
      onClick={handleHiddenTodos}
    >
      {Hidden ? `Show All Todos` : `Show Present Todos`}
    </button>
  );
};

export default button;
