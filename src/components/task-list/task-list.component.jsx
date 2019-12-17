import React from 'react';
import Task from "../task/task.component";
import "./task-list.styles.scss";
import "../../shared-styles.scss";
import { ReactComponent as AddTask } from "../assets/plus-alt.svg";

const TaskList = ({tasksList, onToggleClick, onDeleteClick, onAddTaskClick, onEditTaskClick, openEditTask}) => {
    let count = 0;
    tasksList.forEach(task => {
        if(task.is_done) count++;
    });
    console.log(tasksList);

    return ( 
        <div className="task-list">
            <div className="task-list__header">
                <span className="task-list__title">
                    Your Tasks
                </span>
                <button className="btn task-list__add-task" onClick={onAddTaskClick}>
                    <AddTask className="task-list__add-task-icon" />
                </button>
            </div>
            <div className="task-list__body">
                {tasksList.map(task => {
                    return <Task key={task.id}
                     task={task} 
                     onToggleClick={onToggleClick} 
                     onDeleteClick={onDeleteClick}
                     onEditTaskClick={onEditTaskClick}
                     />
                })}
            </div>
            <div className="task-list__footer">
            <span className="task-list__footer--1">Tasks: {tasksList.length}</span>
            <span className="task-list__footer--2">Completed: {count}</span>
            <span className="task-list__footer--3">Remaining: {tasksList.length - count}</span>
                
            </div>
        </div>
     );
}
 
export default TaskList;