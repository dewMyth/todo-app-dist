import React, { useState, useEffect } from "react";

import Todo from "./Todo";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import axios from "axios";

const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [TodoList, setTodos] = useState([]);

  const config = {
    headers: { token: `bearer ${user.accessToken}` },
  };

  useEffect(() => {
    const fetchTodos = async () => {
      console.log(config);
      const res = await axios.get(
        `https://todo-app-dist.azurewebsites.net/api/todo/${user._id}`,
        config
      );
      console.log(res.data);
      setTodos(res.data);
    };
    fetchTodos();
  }, [user._id]);

  return (
    <React.Fragment>
      <div>My TodoList</div>
      {TodoList.length === 0 ? (
        <div>No Todos</div>
      ) : (
        TodoList.map((item) => {
          return <Todo key={item._id} todo={item} />;
        })
      )}
    </React.Fragment>
  );
};

export default TodoList;
