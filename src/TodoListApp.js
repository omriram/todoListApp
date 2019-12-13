import React, { Component } from "react";
import TaskList from "./components/task-list/task-list.component";
import TaskForm from "./components/task-form/task-form.component";
import "./TodoListApp.scss";

const arrTest = [
  {
    taskId: 1,
    taskName: "clean the house",
    taskDescription: "bla bla bla",
    isDone: false
  },
  {
    taskId: 2,
    taskName: "buy groceries",
    taskDescription: "bla bla bla",
    isDone: false
  },
  {
    taskId: 3,
    taskName: "walk with the dog",
    taskDescription: "bla bla bla",
    isDone: true
  },
  {
    taskId: 4,
    taskName: "go to a meetup",
    taskDescription: "bla bla bla",
    isDone: true
  },
  {
    taskId: 5,
    taskName: "send resumes",
    taskDescription: "bla bla bla",
    isDone: false
  }
];

class TodoListApp extends Component {
  constructor() {
    super();
    this.state = {
      tasksList: arrTest,
      createTask: false,
      editTask: {},
      openEditTask: false
    };
  }

  onToggleClick = taskIdInput => {
    this.setState(prevState => {
      const tasksListCpy = [...prevState.tasksList];
      tasksListCpy.forEach(task => {
        if (task.taskId === taskIdInput) task.isDone = !task.isDone;
      });
      return {
        TaskList: tasksListCpy
      };
    });
  };

  onDeleteClick = taskIdInput => {
    let tasksListCpy = [...this.state.tasksList];
    let indexToRemove;
    tasksListCpy.forEach((task, index) => {
      if (task.taskId === taskIdInput) indexToRemove = index;
    });
    tasksListCpy.splice(indexToRemove, 1);
    this.setState({ tasksList: tasksListCpy });
  };

  onAddTaskClick = () => {
    this.setState(prevState => {
      return {
        createTask: !prevState.createTask
      };
    });
  };

  onSubmitTaskClick = (editTaskId, taskName, taskDescription) => {
    const length = this.state.tasksList.length;
    const { tasksList } = this.state;

    if (taskName !== "") {
      if (editTaskId === null) {
        const newTask = {
          taskId: length > 0 ? tasksList[length - 1].taskId + 1 : 0,
          taskName,
          taskDescription,
          isDone: false
        };
        const tasksListCpy = [...this.state.tasksList, newTask];
        this.setState({ tasksList: tasksListCpy, createTask: false });
      } else {
        tasksList.forEach(task => {
          if (task.taskId === editTaskId) {
            task.taskName = taskName;
            task.taskDescription = taskDescription;
            task.isDone = false;
          }
        });
        this.setState({ tasksList: tasksList, openEditTask: false });
      }
    }
  };

  onEditTaskClick = (taskId, taskName, taskDescription) => {
    const editTask = {
      taskId,
      taskName,
      taskDescription
    };
    this.setState({ editTask, openEditTask: true });
  };

  onFormExitClick = formName => {
    switch (formName) {
      case "createNewTask":
        this.setState({ createTask: false });
        break;
      case "editTask":
        this.setState({ openEditTask: false });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="container">
        <TaskList
          tasksList={this.state.tasksList}
          onToggleClick={this.onToggleClick}
          onDeleteClick={this.onDeleteClick}
          onAddTaskClick={this.onAddTaskClick}
          onEditTaskClick={this.onEditTaskClick}
        />
        {this.state.createTask && (
          <TaskForm
            className={""}
            onSubmitTaskClick={this.onSubmitTaskClick}
            onFormExitClick={this.onFormExitClick}
          />
        )}
        {this.state.openEditTask && (
          <TaskForm
            className={"edit-form-location"}
            onSubmitTaskClick={this.onSubmitTaskClick}
            editTask={this.state.editTask}
            onFormExitClick={this.onFormExitClick}
          />
        )}
      </div>
    );
  }
}

export default TodoListApp;
