const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-CA');
}

const getHeaderFormattedDate = (stringDate) => {
  const date = new Date(stringDate);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(date);
}

const getFormattedDate = (year, month, day) => {
  return new Date(year, month - 1, day).toLocaleDateString('en-CA');
}

const getMonthDetails = (offset) => {
  const currentDate = new Date();
  const desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
  const month = desiredDate.getMonth() + 1;
  const year = desiredDate.getFullYear();
  const monthFirstDay = desiredDate.getDay();
  return [monthFirstDay, month, year];
};

const getCalendarDetails = (monthFirstDay, month, year, categoriesStatuses, categories) => {
  const calendarDays = {};
  let statuses = Object.fromEntries(categories.map(category => [category, 0]));
  for (var i = 0; i < 42; i++) {
    let date = new Date(year, month - 1, 1 - monthFirstDay + i).toLocaleDateString('en-CA');
    calendarDays[date] = { ...statuses, ...categoriesStatuses[date] };
  }
  return calendarDays;
}

const CalendarManager = {
  getCurrentDate,
  getMonthDetails,
  getCalendarDetails,
  getHeaderFormattedDate,
  getFormattedDate
}

export default CalendarManager;