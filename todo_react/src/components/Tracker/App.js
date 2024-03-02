import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Calendar, CategoriesList } from "./";
import API from "../../APIs/TrackerAPI";
import CalendarManager from "../../utils/CalendarManager";
import { Header, DateManager as MonthManger } from "../Common";

export default function Tracker() {
  const [categories, setCategories] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [monthOffset, setMonthOffset] = useState(0);
  const [currMonthYear, setCurrMonthYear] = useState();
  const [calendar, setCalendar] = useState();

  const newCategory = async (title, color) => {
    const newCategory = await API.addCategory(title, color);
    if (newCategory != null) {
      const newCategories = {
        ...categories,
        ...newCategory,
      };
      setCategories(newCategories);
    }
  };

  const editCategory = async (category_id, new_title, new_color) => {
    const updatedCategory = await API.updateCategory(category_id, new_title, new_color);
    if (updatedCategory != null) {
      const newCategories = {
        ...categories,
        ...updatedCategory,
      };
      newCategories[category_id].times_done = categories[category_id].times_done;
      setCategories(newCategories);
    }
  };

  const updateCategoryStatus = async (category_id, toAdd) => {
    const res = await API.updateCategoryStatus(category_id, toAdd, selectedDate);
    if (res != null) {
      const newCategories = { ...categories };
      newCategories[category_id].times_done += toAdd;
      const newCalendar = { ...calendar };
      newCalendar[selectedDate][category_id] = newCategories[category_id].times_done;
      if (newCalendar[selectedDate][category_id] == 0) delete newCalendar[selectedDate][category_id];
      setCalendar(newCalendar);
      setCategories(newCategories);
    }
  };

  const deleteCategory = async (category_id) => {
    const res = await API.deleteCategory(category_id);
    if (res != null && res.statusCode == 204) {
      const newCategories = {
        ...categories,
      };
      delete newCategories[category_id];
      const newCalendar = { ...calendar };
      Object.entries(newCalendar).forEach(([date]) => {
        delete newCalendar[date][category_id];
      });
      setCalendar(newCalendar);
      setCategories(newCategories);
    }
  };

  useEffect(() => {
    (async () => {
      const [monthFirstDay, month, year] = CalendarManager.getMonthDetails(monthOffset);
      const fromDate = CalendarManager.getFormattedDate(year, month, 1 - monthFirstDay);
      const toDate = CalendarManager.getFormattedDate(year, month, 1 - monthFirstDay + 41);
      const [categories, categoriesStatuses] = await Promise.all([
        API.getCategories(),
        API.getCategoriesStatuses(fromDate, toDate),
      ]);
      if (categories != null && categoriesStatuses != null) {
        const calendar = CalendarManager.getCalendarDetails(monthFirstDay, month, year, categoriesStatuses);
        const newSelectedDate =
          monthOffset != 0 ? CalendarManager.getFormattedDate(year, month, 1) : CalendarManager.getCurrentDate();
        const newCurrMonthYear = CalendarManager.getHeaderFormattedDate(newSelectedDate);
        setCategories(categories);
        setCalendar(calendar);
        setSelectedDate(newSelectedDate);
        setCurrMonthYear(newCurrMonthYear);
      }
    })();
  }, [monthOffset]);

  useEffect(() => {
    if (categories != null) {
      const newCategories = { ...categories };
      Object.keys(categories).forEach((categoryId) => {
        newCategories[categoryId].times_done =
          calendar[selectedDate][categoryId] != null ? calendar[selectedDate][categoryId] : 0;
      });
      setCategories(newCategories);
    }
  }, [selectedDate]);

  return (
    <>
      {categories != null && calendar != null && selectedDate != null && (
        <>
          <CategoriesList
            categories={categories}
            newCategory={newCategory}
            editCategory={editCategory}
            updateCategoryStatus={updateCategoryStatus}
            deleteCategory={deleteCategory}
          />
          <Container sx={{ padding: "24px", display: "flex", flexDirection: "column" }} maxWidth={false}>
            <Header title={"Calendar"}>
              <MonthManger
                date={currMonthYear}
                nextOnClick={() => {
                  setMonthOffset(monthOffset + 1);
                }}
                prevOnClick={() => {
                  setMonthOffset(monthOffset - 1);
                }}
              />
            </Header>
            <Calendar
              calendar={calendar}
              categories={Object.fromEntries(Object.keys(categories).map((id) => [id, categories[id].color]))}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Container>
        </>
      )}
    </>
  );
}
