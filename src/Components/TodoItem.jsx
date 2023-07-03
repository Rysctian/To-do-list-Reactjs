import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";

const TodoItem = ({
  addTask,
  todo,
  setTodo,
  submitClicked,
  filterClick,
  filterSearch,
  handleFilterChange
}) => {
  return (
    <form className="p-2 flex flex-col space-y-2">
      {filterClick === true ? (
        <div className="p-2 flex flex-col space-y-2">
          <input
            type="text"
            value={filterSearch}
            placeholder="Search Task"
            onChange={handleFilterChange}
            className="py-2 px-2 border-solid border-2 rounded-md font-semibold text-gray-900 text-lg h-11 border-stone-400"
          />
        </div>
      ) : (
        <>
          <input
            type="text"
            value={todo}
            placeholder={
              submitClicked && todo.trim() === ""
                ? "Please type an Activity"
                : "Type Activity..."
            }
            onChange={(e) => setTodo(e.target.value)}
            className={
              submitClicked && todo.trim() === ""
                ? "py-2 px-2 border-solid border-2 rounded-md border-red-500 font-inter text-sm text-red-500 h-11"
                : "py-2 px-2 rounded-md font-inter font-semibold text-gray-900 text-lg  h-11 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:placeholder-transparent"
            }
          />
          <Button
            ripple={true}
            onClick={addTask}
            className="ripple={true} border-solid border-2 py-2 px-2 h-11 rounded-md font-inter 
            font-light border-blue-200 text-slate-200 bg-blue-600 text-base
            "
          >
            Submit <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </>
      )}
    </form>
  );
};

export default TodoItem;