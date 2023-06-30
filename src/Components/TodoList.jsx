import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Header from "./Header";
import DateTimePicker from "./DateTimePicker";
import Todotask from "./Todotask";



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
  const [filter, setFilter] = useState("");
  

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const onHandleFilter = (e) => {
    setFilterClick(!filterClick);

    if (filterClick === true) {
      setFilter("");
    }
  };

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

  const itemCompleted = (index) => {
    const filteredIndex = list.findIndex(
      (item) => item.task.toLowerCase().includes(filter.toLowerCase())
    );
  
    if (filterClick && filteredIndex !== -1) {
      const updatedList = [...list];
      updatedList[filteredIndex + index].completed = !updatedList[filteredIndex + index].completed;
      setList(updatedList);
  
      // Update localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedList));
    } else if (!filterClick) {
      const updatedList = [...list];
      updatedList[index].completed = !updatedList[index].completed;
      setList(updatedList);
  
      // Update localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedList));
    }
  };
  
  const removeItem = (todoIndex) => {
    const filteredIndex = list.findIndex(
      (item) => item.task.toLowerCase().includes(filter.toLowerCase())
    );
  
    if (filterClick && filteredIndex !== -1) {
      const updatedList = [...list];
      updatedList.splice(filteredIndex + todoIndex, 1);
      setList(updatedList);
  
      // Update localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedList));
    } else if (!filterClick) {
      const updatedList = list.filter((_, idx) => idx !== todoIndex);
      setList(updatedList);
  
      // Update localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedList));
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredList = list.filter((item) =>
    item.task.toLowerCase().includes(filter.toLowerCase())
  );

  const getUnfinishedTaskCount = () => {
    return list.filter((item) => !item.completed).length;
  };



  return (
    <div className="flex justify-center lg:justify-center ">
      <div className=" flex flex-col lg:pt-14 sm:h-screen sm:w-screen px-4 py-5 space-y-2 relative overflow-hidden md:w-4/5 ">
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
                filter={filter}
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
