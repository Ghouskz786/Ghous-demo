import { createContext } from "react";
const todoContext = createContext([]);
export { todoContext };
import { useState, useRef } from "react";
import { useReducer } from "react";
import {
  addTodoService,
  getAllTodos,
  deleteTodoService,
  fetchAllService,
  changeTodoKey,
  doneTodoService,
  getEditService,
} from "../../services/todoItemsServices";
import { useEffect } from "react";
const todosReducer = (currVal, action) => {
  let NewTodos = currVal;
  if (action.type === "GET_ALL") {
    NewTodos = fetchAllService(action.payload);
  } else if (action.type === "ADD_TODOS") {
    NewTodos = [...currVal, changeTodoKey(action)];
  } else if (action.type === "EDIT_TODOS") {
    (action.payload.ValRef.current.value = action.payload.editedTodo.todo),
      (action.payload.DateRef.current.value =
        action.payload.editedTodo.date !== "No time limit"
          ? action.payload.editedTodo.date
          : "");
    NewTodos = fetchAllService(action.payload.allTodos);
  } else if (action.type === "DONE_TODOS") {
    NewTodos = fetchAllService(action.payload);
  } else if (action.type === "HIDDEN_TODOS") {
    action.payload.setHidden(!action.payload.Hidden);
    NewTodos = currVal;
  } else if (action.type === "DELETE_TODOS") {
    NewTodos = fetchAllService(action.payload);
  }

  return NewTodos;
};
const WrapEveryThing = ({ children }) => {
  const ValRef = useRef("");
  const DateRef = useRef("");
  const [Hidden, setHidden] = useState(true);
  const [todos, dispatchtodos] = useReducer(todosReducer, []);
  const handleDelete = async (e) => {
    const id = e.target.id;
    const allTodos = await deleteTodoService(id);
    const DeleteTodos = {
      type: "DELETE_TODOS",
      payload: allTodos,
    };
    dispatchtodos(DeleteTodos);
  };
  const handleClick = async (ValRef, DateRef) => {
    const Value = ValRef.current.value;
    const Date = DateRef.current.value;
    const todo = await addTodoService({
      text: Value,
      date: Date,
    });
    let addTodos = {
      type: "ADD_TODOS",
      payload: todo,
    };

    Value !== "" && dispatchtodos(addTodos);
    ValRef.current.value = "";
    DateRef.current.value = "";
  };
  const handleEdit = async (e) => {
    const id = e.target.id;
    const { editedTodo, allTodos } = await getEditService(id);
    dispatchtodos({
      type: "EDIT_TODOS",
      payload: { editedTodo, ValRef, DateRef, allTodos },
    });
  };
  const handleDone = async (e) => {
    let id = e.target.id;
    const allTodos = await doneTodoService(id);
    const DoneTodos = {
      type: "DONE_TODOS",
      payload: allTodos,
    };

    dispatchtodos(DoneTodos);
  };
  const handleHiddenTodos = (e) => {
    const HiddenTodos = {
      type: "HIDDEN_TODOS",
      payload: {
        Hidden,
        setHidden,
      },
    };
    dispatchtodos(HiddenTodos);
  };
  const handleGetAllTodos = (todos) => {
    dispatchtodos({
      type: "GET_ALL",
      payload: todos,
    });
  };
  useEffect(() => {
    (async () => {
      const todos = await getAllTodos();
      handleGetAllTodos(todos);
    })();
  }, []);
  return (
    <todoContext.Provider
      value={{
        todos,
        handleClick,
        ValRef,
        DateRef,
        Hidden,
        handleDelete,
        handleEdit,
        handleHiddenTodos,
        handleDone,
        handleGetAllTodos,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};
export { WrapEveryThing };
