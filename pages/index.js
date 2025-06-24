import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// to do list: buttons, popups, templates, and lists
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4(); // Generates a unique ID for the new todo
    const values = { name, date, id };
    renderTodo(values);
    todoFormValidator.resetValidation();
    addTodoPopup.close();
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

// This function generates a new Todo instance and returns its view element.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

// This function renders a todo item by generating its view and adding it to the section.
const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

// Section instance to manage the todo items
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// This function closes the modal by removing the class that makes it visible.

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoFormValidator = new FormValidator(validationConfig, addTodoForm);

todoFormValidator.enableValidation();

// wanted to submit README.md after the first review.
