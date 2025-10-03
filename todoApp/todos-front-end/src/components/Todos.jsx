import React from "react";
import style from "./todo.module.css";
import { useContext } from "react";
import { todoContext } from "../store/storeItems";
import { FcCheckmark } from "react-icons/fc";
const Todos = () => {
  const { todos, handleDelete, handleEdit, handleDone, Hidden } =
    useContext(todoContext);
  return (
    <>
      {todos.map((item) => {
        return (
          <div key={item.id}>
            {!Hidden || item.del === false ? (
              <div className={`row ${style["todo"]}`} key={item.id}>
                <div className={`${style.donebtn} col-2`}>
                  <button
                    type="button"
                    className={`btn btn-success  ${style.done}`}
                    id={item.id}
                    onClick={handleDone}
                  >
                    {item.del ? "UnDone" : "Done"}
                  </button>
                </div>
                <div
                  className={`col-4 ${item.del === true && style.lineThrough}`}
                >
                  {item.text}
                </div>
                <div className="col-4">{item.date}</div>
                <div className={`col-2 ${style.btnStyle}`}>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleEdit}
                    id={item.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id={item.id}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};

export default Todos;
