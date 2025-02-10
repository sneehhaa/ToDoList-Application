import React, { useState } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import TaskStatistics from "./Components/TaskStatistics";
import TaskList from "./Components/TaskList";
import { ToastContainer } from "react-toastify";
import { Task } from "./types"

const App = () => {
  
  const[tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ?  JSON.parse(storedTasks) : []
  })

  const [deletedTasks, setDeletedTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("deletedTasks");
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  return (
    <div className="bg-red">  
    <TaskStatistics
    tasks = {tasks} 
    deletedTasks={deletedTasks} />
    <AddTaskForm 
    tasks={tasks}
    setTasks={setTasks}
    />
    <TaskList
    tasks={tasks}
    deletedTasks={deletedTasks}
    setTasks={setTasks}
    setDeletedTasks={setDeletedTasks} />
    <ToastContainer 
    position="top-right" 
    autoClose={3000} 
    closeOnClick 
    pauseOnHover 
    theme="dark" />
    </div>

  );
};

export default App;
