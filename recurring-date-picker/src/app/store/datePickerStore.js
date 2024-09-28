import { create } from 'zustand';

const useDatePickerStore = create((set) => ({
  selectedDate: null,
  recurringOption: 'none', // daily, weekly, monthly, yearly
  interval: 1, // X days/weeks/months/years
  daysOfWeek: [], // For weekly recurrence
  nthDay: { day: 1, weekday: 'Monday' }, // For nth day of the month
  startDate: null,
  endDate: null,
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  setRecurringOption: (option) => set({ recurringOption: option }),
  setInterval: (interval) => set({ interval }),
  setDaysOfWeek: (days) => set({ daysOfWeek: days }),
  setNthDay: (nthDay) => set({ nthDay }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
}));

export default useDatePickerStore;
