import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Header from "./Header";
import DateTimePicker from "./DateTimePicker";
import Todotask from "./Todotask";
import { v4 as uuidv4 } from "uuid";

function getTodoListFromLocalStorage() {
  const storedList = localStorage.getItem("todoList");
  if (storedList) {
    return JSON.parse(storedList);
  } else {
    return [];
  }
}

function TodoList() {
  const [list, setList] = useState(getTodoListFromLocalStorage());
  const [todo, setTodo] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filterClick, setFilterClick] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const addTask = (e) => {
    e.preventDefault();

    if (todo.trim() !== "") {
      const options = {
        month: "numeric",
        day: "numeric",
      };

      let formattedDate = "";
      let formattedTime = "";

      if (selectedTime) {
        const currentDate = new Date(selectedTime);
        formattedDate = currentDate.toLocaleDateString(undefined, options);

        const timeOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

        formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);
      } else {
        const currentDate = new Date();
        formattedDate = currentDate.toLocaleDateString(undefined, options);

        const timeOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

        formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);
      }

      let newTask = {
        id: uuidv4(),
        task: todo,
        completed: false,
        time: formattedTime,
        date: formattedDate,
      };

      let newList = [...list, newTask];
      setList(newList);
      setTodo("");
      setSelectedTime(null);

      // Update localStorage
      localStorage.setItem("todoList", JSON.stringify(newList));
    } else {
      setSubmitClicked(true);
    }

    setTimeout(() => {
      setSubmitClicked(false);
    }, 1500);
  };

  const itemCompleted = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);

    // Update localStorage
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const removeItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);

    // Update localStorage
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const onHandleFilter = () => {
    setFilterClick(!filterClick);

    if (filterClick === true) {
      setFilterSearch("");
    }
  };

  const handleFilterChange = (e) => {
    setFilterSearch(e.target.value);
  };

  const filteredList = list.filter((item) =>
    item.task.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const getUnfinishedTaskCount = () => {
    return list.filter((item) => !item.completed).length;
  };

  return (
    <div className="flex justify-center lg:justify-center">
      <div className="flex flex-col lg:pt-14 w-screen h-screen sm:h-screen sm:w-screen pt-4 px-1 space-y-2 relative overflow-hidden md:w-4/5">
        <Header
          getUnfinishedTaskCount={getUnfinishedTaskCount}
          list={list}
          onHandleFilter={onHandleFilter}
        />

        <div className="flex flex-col height myElement">
          <div className="space-y-2 flex flex-col">
            <div className="border-solid bg-slate-300 h-44 border space-y-4">
              <TodoItem
                addTask={addTask}
                todo={todo}
                setTodo={setTodo}
                submitClicked={submitClicked}
                filterClick={filterClick}
                filterSearch={filterSearch}
                handleFilterChange={handleFilterChange}
              />

              <DateTimePicker setSelectedTime={setSelectedTime} />
            </div>
          </div>
          <div className="max-h-fit overflow-y-auto p-3">
            <Todotask
              filteredList={filteredList}
              itemCompleted={itemCompleted}
              removeItem={removeItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
