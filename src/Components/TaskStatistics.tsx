import React from "react";
import { Task } from "../types"

interface TaskStatisticsProps {
  tasks: Task[];
  deletedTasks: Task[];
}

const TaskStatistics = ({ tasks, deletedTasks }: TaskStatisticsProps) => {
  const total = tasks.length + deletedTasks.length; 
  const done = tasks.filter((task) => task.done).length; 
  const pending = tasks.filter((task) => !task.done).length; 
  const deleted = deletedTasks.length; 

  return (
    <div className="text">
      <div className="text-2xl font-serif flex justify-center items-center mt-5">
        Todo List
      </div>
    <div className="flex bg-indigo-100 p-4 rounded space-x-4 flex justify-center items-center mt-5">
      <div className="bg-green-500 text-white text-lg font-medium px-3 py-1 rounded inline-block cursor-pointer">
        Total : {total}
      </div>
      <div className="bg-pink-500 text-white text-lg font-medium px-3 py-1 rounded inline-block cursor-pointer">
        Done : {done}
      </div>
      <div className="bg-yellow-500 text-white text-lg font-medium px-3 py-1 rounded inline-block cursor-pointer">
        Pending : {pending}
      </div>
      <div className="bg-red-500 text-white text-lg font-medium px-3 py-1 rounded inline-block cursor-pointer">
        Deleted : {deleted}
      </div>
    </div>
    </div>
  );
};

export default TaskStatistics;

