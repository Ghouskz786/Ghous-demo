export const addTodoService = async ({ text, date, isCompleted }) => {
  let response = await fetch("http://localhost:3000/api/todo/", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ text, date: date, isCompleted }),
  });

  return await response.json();
};
export const getAllTodos = async () => {
  const response = await fetch("http://localhost:3000/api/todo/all");
  return await response.json();
};
export const deleteTodoService = async (id) => {
  const response = await fetch("http://localhost:3000/api/todo/delete", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });
  return await response.json();
};
export const fetchAllService = (itrater) => {
  return itrater.map((todo) => {
    return {
      id: todo._id,
      text: todo.todo,
      date: todo.date ? todo.date : "No time limit",
      del: todo.isCompleted,
    };
  });
};
export const doneTodoService = async (id) => {
  const response = await fetch("http://localhost:3000/api/todo/done", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });
  return await response.json();
};

export const getEditService = async (id) => {
  const response = await fetch("http://localhost:3000/api/todo/edit-value", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });
  return await response.json();
};

export const changeTodoKey = (action) => {
  return {
    id: action.payload._id,
    text: action.payload.todo,
    date: action.payload.date,
    del: action.payload.isCompleted,
  };
};
