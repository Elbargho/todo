import { useState, useEffect, Fragment } from "react";
import { Container } from "@mui/material";
import { OneTask, MultiTask, CompletedTasks } from ".";
import { Divider, AddItem as AddATask, ContextMenu } from "../Common";
import TaskAdderInput from "./TaskAdderInput";
import API from "../../APIs/TasksAPI";

const SubTaskDoneAudio = new Audio("/audio/SubTask_Done.mp3");
const TaskDoneAudio = new Audio("/audio/Task_Done.mp3");

export default function Category({ id, tasks, current_day }) {
  const [categoryTasks, setCategoryTasks] = useState(tasks);
  const [taskAdderInputId, setTaskAdderInputId] = useState(null);
  const [tasksContainer, setTasksContainer] = useState([]);
  const [completedTasksContainer, setCompletedTasksContainer] = useState([]);

  const isCategorySelected = (taskId) => taskAdderInputId === taskId;

  const buildTasksContainer = () => {
    const tasks = [];
    const completedTasks = [];

    for (const task of categoryTasks) {
      const taskComponent = isCategorySelected(task.id) ? (
        <TaskAdderInput
          is_done={task.is_done}
          value={task.raw_title}
          setTaskAdderInputId={setTaskAdderInputId}
          setTaskRawTitle={editTask}
        />
      ) : task.sub_tasks && Object.values(task.sub_tasks).length > 0 ? (
        <MultiTask
          id={task.id}
          {...task}
          updateTaskStatus={updateMultiTaskStatus}
          onContextMenu={(event) => handleContextMenu(event, task.id)}
        />
      ) : (
        <OneTask
          id={task.id}
          {...task}
          updateTaskStatus={updateSingleTaskStatus}
          onContextMenu={(event) => handleContextMenu(event, task.id)}
        />
      );

      const taskContainer = (
        <Fragment key={task.id}>
          <Divider />
          {taskComponent}
        </Fragment>
      );

      if (task.is_done === 1) {
        completedTasks.push(taskContainer);
      } else {
        tasks.push(taskContainer);
      }
    }

    setTasksContainer(tasks);
    setCompletedTasksContainer(completedTasks);
  };

  const addATaskOnClick = () => {
    setTaskAdderInputId(-1);
  };

  const playSubTaskDoneAudio = () => {
    SubTaskDoneAudio.pause();
    TaskDoneAudio.currentTime = 0;
    TaskDoneAudio.play();
  };

  const playTaskDoneAudio = () => {
    TaskDoneAudio.pause();
    SubTaskDoneAudio.currentTime = 0;
    SubTaskDoneAudio.play();
  };

  const updateTaskStatus = async (taskId, subTaskId, isMultiTask) => {
    const data = await API.updateTaskStatus(taskId, subTaskId, isMultiTask);
    if (data != null) {
      const updatedCategoryTasks = [...categoryTasks];
      const idx = updatedCategoryTasks.findIndex((task) => task.id == taskId);
      updatedCategoryTasks[idx] = data.task;
      setCategoryTasks(updatedCategoryTasks);
      if (data.is_progress) {
        if (data.task.is_done == 1) {
          playSubTaskDoneAudio();
        } else {
          playTaskDoneAudio();
        }
      }
    }
  };

  const updateSingleTaskStatus = (taskId, subTaskId) => {
    updateTaskStatus(taskId, subTaskId, false);
  };

  const updateMultiTaskStatus = (taskId, subTaskId) => {
    updateTaskStatus(taskId, subTaskId, true);
  };

  const editTask = async (updatedRawTitle) => {
    const updatedTask = await API.editTask(taskAdderInputId, id, updatedRawTitle, current_day);
    if (updatedTask != null) {
      const updatedCategoryTasks = [...categoryTasks];
      const idx = updatedCategoryTasks.findIndex((task) => task.id == taskAdderInputId);
      updatedCategoryTasks[idx] = updatedTask;
      setCategoryTasks(updatedCategoryTasks);
    }
  };

  const deleteTask = async (task_id) => {
    const res = await API.deleteTask(task_id);
    if (res.statusCode == 204) {
      const updatedCategoryTasks = [...categoryTasks];
      const idx = updatedCategoryTasks.findIndex((task) => task.id == task_id);
      updatedCategoryTasks.splice(idx, 1);
      setCategoryTasks(updatedCategoryTasks);
    }
  };

  const addTask = async (rawTitle) => {
    const newTask = await API.addTask(id, rawTitle, current_day);
    if (newTask != null) {
      const updatedCategoryTasks = [newTask, ...categoryTasks];
      setCategoryTasks(updatedCategoryTasks);
    }
  };

  const { contextMenu, handleContextMenu } = ContextMenu({
    editItem: (note_id) => {
      setTaskAdderInputId(note_id);
    },
    deleteItem: deleteTask,
  });

  useEffect(() => {
    buildTasksContainer();
  }, [categoryTasks, taskAdderInputId]);

  useEffect(() => {
    setCategoryTasks(tasks);
  }, [tasks]);

  return (
    <Container maxWidth={false}>
      <Container sx={{ bgcolor: "var(--task-container-color)" }} maxWidth={false} disableGutters>
        {taskAdderInputId !== -1 ? (
          <AddATask onClick={addATaskOnClick} title={"Add a task"} />
        ) : (
          <TaskAdderInput is_done={0} value={""} setTaskAdderInputId={setTaskAdderInputId} setTaskRawTitle={addTask} />
        )}
        {tasksContainer}
      </Container>
      <CompletedTasks>{completedTasksContainer}</CompletedTasks>
      {contextMenu}
    </Container>
  );
}
