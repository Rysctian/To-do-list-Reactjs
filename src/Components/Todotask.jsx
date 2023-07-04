import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@material-tailwind/react";

const Todotask = ({ filteredList, itemCompleted, removeItem }) => {
  return (
    <div className="todo-item-list space-y-4 ">
      {filteredList.map((item) => (
        <div className="list" key={item.id}>
          <div className={item.completed ? "line-through" : ""}>
            <div className="border-b-2 flex space-x-3 relative items-center item-height place-self-center">
              <Checkbox
                type="checkbox"
                defaultChecked
                ripple={false}
                className="rounded-full hover:before:opacity-0 hover:scale-105 bg-blue-500/25 border-blue-500/50 transition-all"
                checked={item.completed}
                onChange={() => itemCompleted(item.id)}
              />
              <span className={`font-inter capitalize item-width overflow-x-auto items-center  lg:text-3xl lg:font-extrabold lg:w-fit ${item.completed ? 'text-red-600' : 'text-black'}`}>
                {item.task}
              </span>
              {item.date && <span className="absolute right-32 font-inter smSize p-1  text-gray-500 lg:text-2xl lg:right-48"> {item.date}</span>}
              {item.time && <span className="absolute right-9 font-inter text-sm p-2 bg-customGray rounded-md lg:text-2xl text-slate-600 font-medium lg:right-12"> {item.time}</span>}
              <div className="absolute right-1 h-8 p-1  flex items-center">
                <button className="trash-button" onClick={() => removeItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todotask;
