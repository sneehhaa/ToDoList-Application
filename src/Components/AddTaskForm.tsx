import React, {useState} from "react";
import { Task } from "../types"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

interface AddTaskFormProps {
    tasks: Task[];
    setTasks: (tasks:Task[]) => void;
}

    const AddTaskForm = ({tasks, setTasks}: AddTaskFormProps) => {
        const [taskName, setTaskName] = useState("");
        const [isButtonEnabled,setIsButtonEnabled] = useState(false);
        const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTaskName(value);
        validInput(value);
    }

    const validInput = (value : string) => {
        const hasSpacesInTheEnds = value.trim() !== value;
        const isValid = value.length >= 10 && !hasSpacesInTheEnds
        setIsButtonEnabled(isValid);

        if(hasSpacesInTheEnds) {
            setErrorMessage("Task Name should not have spaces in the beginning and ending")
        } else if (value.length < 10) {
            setErrorMessage("Task Name must have atleast 10 characters")
        } else {
            setErrorMessage("")
        }
    }

    const handleAddTask = () => {
        if(taskName.trim().length >= 10){
            setTasks([...tasks, {id: uuidv4(), name: taskName, done: false, createdAt: new Date()}]);
            setTaskName("");
            toast.success("Task added successfully");
        }
    }

    const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && isButtonEnabled) {
            handleAddTask();
        }
    }

    return (
        <div className="p-4">
            <div className="text-center">
                <input 
                type="text"
                value={taskName}
                onChange={handleChange}
                onKeyDown={handleKey}
                placeholder="Enter task name"
                className="p-2 border border-black rounded"
                />
            <button 
            onClick = {handleAddTask}
            disabled = {!isButtonEnabled}
            className={`p-2 bg-blue-500 ml-3 border border-grey text-black rounded ${!isButtonEnabled && 'cursor-pointer'}`}>
                Add Task
            </button>
            </div>
            {errorMessage && <div className="text-red-500"> {errorMessage} </div>}
        </div>
    )
}
export default AddTaskForm;