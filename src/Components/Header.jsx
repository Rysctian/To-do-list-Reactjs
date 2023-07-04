import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ getUnfinishedTaskCount, list, onHandleFilter, filterClick }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace(",", "-");
  };

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="p-4 flex flex-col bg-cyan-800 md:px-7 h-36 place-content-center space-y-4 rounded-lg">
      <div className="header-date-time flex space-x-32 md:space-x-64 text-gray-300 font-inter text-sm lg:relative ">
        <div className="date md:text-lg lg:font-semibold ">{formatDate(currentDateTime)}</div>
        <div className="time md:text-lg lg:absolute lg:right-12 lg:font-semibold">{formatTime(currentDateTime)}</div>
      </div>



      <div className="font-inter font-extrabold text-3xl text-white md:text-4xl">To Do List App</div>

    <div className="flex">
      {list.length > 0 ? (
        <div className="task-remaining font-inter text-white text-sm md:text-1xl">
          You have {getUnfinishedTaskCount()} task(s) remaining:
        </div>
      ) : (
        <div className="task-remaining font-inter text-sm text-slate-100">You have no task to do</div>
      )}

      <button onClick={onHandleFilter} className="h-6 w-8 text-sm font-inter rounded-md">
          {filterClick === true ? (
            <FontAwesomeIcon icon={faSearch} color="#F55454" />
          ) : (
            <FontAwesomeIcon icon={faSearch} color="#00FFFF" />
          )}
        </button>
    </div>
    </div>
  );
};

export default Header;
