import { useEffect, useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { Task } from "./Task";

export const TaskList = (props) => {
    const {list, onDeleteTask} = props
    const [completed, addComplete] = useTaskList();


    const handleDelete = (nameTask) =>{
        const newList = completed.filter(item => nameTask !== item);
        localStorage.setItem('completed',JSON.stringify(newList))
        onDeleteTask(nameTask)
    }

    function handleChecked(boolean,nameTask){
        addComplete(boolean,nameTask);
    }

    return(
        <ul>
            {list.map((task)=>(
                <Task name = {task.name} onDelete={handleDelete}
                isTaskChecked = {handleChecked}
                isCompleted = {completed.includes(task.name)}
                />
            ))}
        </ul>
    );
};