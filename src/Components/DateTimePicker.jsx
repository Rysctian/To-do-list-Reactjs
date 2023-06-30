import React from "react";

const DateTimePicker = ({ setSelectedTime }) => {
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  

  return (
    <div className="flex items-center space-x-1 px-3">
      <label htmlFor="datetime" className="text-gray-500 font-bold">
        Select Date:
      </label>
      <input
        type="datetime-local"
        id="datetime"
        defaultValue={getCurrentDateTime()}
        onChange={handleTimeChange}
        className="border-2 border-blue-300 px-3 py-1 rounded-md text-sm"
      />
    </div>
  );
};

export default DateTimePicker;
