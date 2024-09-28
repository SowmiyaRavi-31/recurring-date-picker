"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RecurrenceOptions from "./RecurrenceOptions";
import useDatePickerStore from "../store/datePickerStore";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DatePicker = () => {
  const [recurrencePattern, setRecurrencePattern] = useState("daily");
  const [frequencyInterval, setFrequencyInterval] = useState(1);
  const [nthWeekday, setNthWeekday] = useState(1);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  useEffect(() => {
    if (startDate) {
      const generatedDates = calculateRecurrence(startDate, endDate, recurrencePattern, frequencyInterval, selectedWeekdays, nthWeekday);
      setHighlightedDates(generatedDates);
    }
  }, [startDate, endDate, recurrencePattern, frequencyInterval, selectedWeekdays, nthWeekday]);

  const calculateRecurrence = (start, end, pattern, interval, days, nth) => {
    const datesArray = [];
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;
    let currentDate = new Date(startDate);

    while (!endDate || currentDate <= endDate) {
      if (pattern === "daily") {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + interval);
      } else if (pattern === "weekly" && days.length > 0) {
        days.forEach((day) => {
          const nextWeekDay = new Date(currentDate);
          const dayOffset = (7 + weekdays.indexOf(day) - nextWeekDay.getDay()) % 7;
          nextWeekDay.setDate(currentDate.getDate() + dayOffset);
          if (!datesArray.some(date => date.toDateString() === nextWeekDay.toDateString())) {
            datesArray.push(new Date(nextWeekDay));
          }
        });
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (pattern === "monthly") {
        if (nth && days.length > 0) {
          const nthDayDate = findNthWeekdayOfMonth(nth, currentDate.getMonth(), currentDate.getFullYear(), days[0]);
          datesArray.push(nthDayDate);
        } else {
          datesArray.push(new Date(currentDate));
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (pattern === "yearly") {
        datesArray.push(new Date(currentDate));
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }

      if (endDate && currentDate > endDate) break;
    }

    return datesArray;
  };

  const findNthWeekdayOfMonth = (nth, month, year, day) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const dayOffset = (7 + weekdays.indexOf(day) - firstDayOfMonth) % 7;
    const nthDay = 1 + dayOffset + (nth - 1) * 7;
    return new Date(year, month, nthDay);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recurring Event Scheduler</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Start Date:</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">End Date:</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
      </label>

      <RecurrenceOptions
        recurrencePattern={recurrencePattern}
        setRecurrencePattern={setRecurrencePattern}
        frequencyInterval={frequencyInterval}
        setFrequencyInterval={setFrequencyInterval}
        nthWeekday={nthWeekday}
        setNthWeekday={setNthWeekday}
        selectedWeekdays={selectedWeekdays}
        setSelectedWeekdays={setSelectedWeekdays}
      />

      <h3 className="text-lg font-semibold mb-4">Highlighted Recurring Dates:</h3>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {highlightedDates.map((date, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 w-10 border border-blue-300 rounded-full text-blue-700"
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      <Calendar
        className="border-2 border-gray-300 rounded-md mt-4"
        tileClassName={({ date }) => highlightedDates.some(d => d.toDateString() === date.toDateString()) ? 'bg-blue-200' : ''}
        onChange={setStartDate}
        value={new Date(startDate)}
      />
    </div>
  );
};

export default DatePicker;
