import { useState } from "react";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const RecurrenceOptions = ({ 
  recurrencePattern, 
  setRecurrencePattern, 
  frequencyInterval, 
  setFrequencyInterval, 
  nthWeekday, 
  setNthWeekday, 
  selectedWeekdays, 
  setSelectedWeekdays 
}) => {
  const toggleWeekdaySelection = (day) => {
    setSelectedWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="mb-4">
      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Recurrence Pattern:</span>
        <select
          value={recurrencePattern}
          onChange={(e) => setRecurrencePattern(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Frequency Interval:</span>
        <input
          type="number"
          value={frequencyInterval}
          onChange={(e) => setFrequencyInterval(Number(e.target.value))}
          min="1"
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
      </label>

      {recurrencePattern === "weekly" && (
        <div className="block mb-4">
          <span className="text-gray-700 font-semibold">Select Days of the Week:</span>
          <div className="flex mt-2">
            {weekdays.map((day) => (
              <label key={day} className="mr-4">
                <input
                  type="checkbox"
                  checked={selectedWeekdays.includes(day)}
                  onChange={() => toggleWeekdaySelection(day)}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {recurrencePattern === "monthly" && (
        <div className="block mb-4">
          <span className="text-gray-700 font-semibold">Specify the nth Weekday:</span>
          <input
            type="number"
            value={nthWeekday}
            onChange={(e) => setNthWeekday(Number(e.target.value))}
            min="1"
            className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;
