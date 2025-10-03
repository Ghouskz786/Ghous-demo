import React, { useRef } from "react";
import style from "./input.module.css";
import { todoContext } from "../store/storeItems";
import { useContext } from "react";
const input = () => {
  const { ValRef, DateRef, handleClick } = useContext(todoContext);
  return (
    <>
      <div className={`row ${style["input"]}`}>
        <div className="col-6">
          <input type="text" placeholder="Enter Todo Here" ref={ValRef} />
        </div>
        <div className="col-4">
          <input type="date" ref={DateRef} />
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => {
              handleClick(ValRef, DateRef);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default input;
