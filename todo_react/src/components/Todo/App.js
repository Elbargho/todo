import * as React from "react";
import { Container } from "@mui/material";
import { CategoriesList, Category } from "./";
import { useEffect, useState } from "react";
import API from "../../APIs/TasksAPI";
import { Header, DateManager as TodayManager } from "../Common";

export default function ToDoList() {
  const [categories, setCategories] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [tasks, setTasks] = useState();

  const getNextDayTasks = async () => {
    const data = await API.getNextDayTasks(selectedCategoryId, currentDay);
    if (data != null) {
      setCurrentDay(data["current_day"]);
      setTasks(data["tasks"]);
    }
  };

  useEffect(() => {
    (async () => {
      const [categories, current_day] = await Promise.all([API.getCategories(), API.getCurrentDay()]);
      if (categories != null) setCategories(categories);
      if (current_day != null) {
        setCurrentDay(current_day["current_day"]);
        setSelectedCategoryId(1);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCategoryId != null) {
      (async () => {
        const data = await API.getCategoryTasks(selectedCategoryId, currentDay);
        if (data != null) {
          setTasks(data);
        }
      })();
    }
  }, [selectedCategoryId]);

  return (
    <>
      {categories != null && selectedCategoryId != null && currentDay != null && tasks != null && (
        <>
          <CategoriesList
            categories={categories}
            setCategories={setCategories}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
          <Container sx={{ padding: "24px", overflowX: "hidden" }} maxWidth={false}>
            <Header title={categories.find((cat) => cat.id == selectedCategoryId).name}>
              {selectedCategoryId == 1 && <TodayManager date={currentDay} nextOnClick={getNextDayTasks} />}
            </Header>
            <Category id={selectedCategoryId} tasks={tasks} current_day={currentDay} />
          </Container>
        </>
      )}
    </>
  );
}
