import React, { Component } from 'react';
import "./task-form.styles.scss";
import "../../shared-styles.scss";

class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            taskName: "",
            taskDescription: ""
        }
    }

    onInputChange = (e) => {
        switch(e.target.type) {
            case "text":
                this.setState({taskName: e.target.value});
                break;
            case "textarea":
                this.setState({taskDescription: e.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
    }


    render() { 
        const {taskName, taskDescription} = this.state;
        const {className, editTask, onFormExitClick} = this.props;
       
        const taskNamePl = editTask !== undefined ? editTask.taskName : "Task name";
        const taskDescriptionPl = editTask !== undefined ? editTask.taskDescription : "Task description";
        const formName = editTask === undefined ? "createNewTask" : "editTask";
        const editTaskId =  editTask === undefined ? null : editTask.taskId;

        return ( 
            <form className={`task-form ${className} detailsEntrance`} onSubmit={this.onSubmitForm}>
            <h3 className="task-form__heading">Task Information</h3>
            <input type="text" 
                    className="task-form__input" 
                    placeholder={taskNamePl}
                    required
                    onChange={this.onInputChange}
                    maxLength="20" />                
            <textarea cols="30"
                    rows="20" 
                    className="task-form__text-area"
                    placeholder={taskDescriptionPl}
                    onChange={this.onInputChange}
                    />
            
            <button className="btn task-form__submit" 
            onClick={() => this.props.onSubmitTaskClick(editTaskId, taskName, taskDescription)}>
                Submit</button>
            <button className="btn task-form__btn-exit" 
            onClick={() => onFormExitClick(formName)}>&#10006;</button>  
            </form>  
         );
    }
}
 
export default TaskForm;

