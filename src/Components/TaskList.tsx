import React, { useCallback, useEffect, useState } from "react";
import { Task } from "../types"
import { toast } from 'react-toastify';
import moment from "moment";

interface TaskListProps {
  tasks: Task[];
  deletedTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setDeletedTasks: (deletedTasks: Task[]) => void;
}

const TaskList = ({ tasks, deletedTasks, setTasks, setDeletedTasks }: TaskListProps) => {
    const [searchQuery, setSearchQuery] = useState("")

  const handleDeleteTask = (taskName: string) => {
    const deletedTask = tasks.find((task) => task.name === taskName);
    if (deletedTask) {
      const updatedTask = {...deletedTask, deletedAt: new Date()}
      setTasks(tasks.filter((task) => task.name !== taskName));
      setDeletedTasks([...deletedTasks, updatedTask]);
      toast.error("Task deleted successfully");
    }
  };

  const restoreDeleteTask = (taskName: string) => {
    const deletedTask = deletedTasks.find((task) => task.name === taskName);
    if (deletedTask) {
        const restoredTask = {...deletedTask, deletedAt: "N/A"}
        setTasks([...tasks, restoredTask])
        setDeletedTasks(deletedTasks.filter((task) => task.name !== taskName))
        toast.success("Task restored successfully")
    }
  }

  const handleCheckBox = useCallback((taskName: string) => {
    const updatedTasks = tasks.map((task) => task.name === taskName ? { ...task, done:!task.done } : task)
    const requiredtask = updatedTasks.find((task) => task.name === taskName)
    if (requiredtask) {
        if (requiredtask.done){
            toast.success("Task completed successfully")
    } else {
        toast.warning("Task pending")
        }
    }
    setTasks(updatedTasks);
  }, [tasks, setTasks]);

  const filteredTasks = tasks.filter((task) => 
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
);

    const filteredDeletedTasks = deletedTasks.filter((task) => 
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
    }, [tasks, deletedTasks])

    useEffect(() => {
        setSearchQuery(searchQuery);
    }, [searchQuery]);

  return (
    <div>
        <div className="mt-3">
        <input
        type="search"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-black rounded ml-4"
        />
        </div>
        <div className="mt-4">
            <h2 style={{
                minWidth: "300px",
                maxWidth: "300px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "300px",
                textOverflow: "ellipsis"
            }}>
                Pending & Completed Tasks</h2>
            <ul style={{listStyleType: "none"}}>
                {filteredTasks.length > 0 ? (filteredTasks.map((task, index) => (
                    <li key = {task.id} className="p-2 border -b border-none ml-4 flex items-center space-x-4">
                        <div className="flex items-center">
                        <input
                        type="checkbox"
                        className="mr-2"
                        checked={task.done}
                        onChange={() => handleCheckBox(task.name)}
                        />
                        <div className="mr-2"> {index + 1}. </div>
                        <div
                        style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "300px"
                        }}>
                        {task.name}</div>
                        </div>
                        <div className="flex flex-col items-end"></div>
                        <div className="ml-2 text-sm text-green-500">Created At: {moment(task.createdAt).format('MMMM Do YYYY, h:mm A')}</div>
                        <button
                        onClick={() => handleDeleteTask(task.name)}
                        className="ml-4 text-red-300 hover:text-red-700 cursor-pointer">
                            Delete
                        </button>
                    </li>
                )
                )) : (<li className="p-2 border -b border-none">No tasks found</li>)}
            </ul>
        </div>
        <div className="mt-4">
            <h2 style={{
                minWidth: "300px",
                maxWidth: "300px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "300px",
                textOverflow: "ellipsis"
            }}>Deleted Tasks</h2>
            <ul style={{listStyleType: "none"}}>
                {filteredDeletedTasks.length > 0 ? (filteredDeletedTasks.map((task, index) => (
                    <li key = {task.id} className="p-2 border-b border-none ml-4 flex items-center space-x-4">
                        <div> {index + 1}. </div>
                        <div style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "300px",
                            textDecoration: "line-through"
                        }}>
                            {task.name}
                        </div>
                        <div className="ml-2 text-sm text-red-500">Deleted At: {moment(task.deletedAt).format('MMMM Do YYYY, h:mm A')}</div>
                        <button 
                        onClick={() => restoreDeleteTask(task.name)}
                        className="ml-4 text-green-300 hover:text-green-700 cursor-pointer">
                            Restore
                        </button>
                    </li>
                )
            )) : (<li className="p-2 border-b border-grey">No tasks found</li>)}
            </ul>
        </div>
    </div>
  )
}
export default TaskList;
