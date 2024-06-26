const addTodoForm = document.querySelector("#add-body");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".list-body");
const removeAllTodos = document.querySelector("#remove-all-Todos");
const searchInput = document.querySelector("#search-input");
let myTodos = [];

searchInput.addEventListener("keyup", searchTodo);

function searchTodo() {
  let searchValue = searchInput.value.toLowerCase()
  let listElements = document.querySelectorAll(".list-elem");
  if (listElements.length > 0) {
    listElements.forEach(todo =>{
      if (todo.textContent.toLowerCase().trim().includes(searchValue)) {
        todo.setAttribute("style","display : block");
      } else {
        todo.setAttribute("style","display : none")
      }                             
    });
  }else{
    alert("Ən az 1 todo daxil edin")
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const myTodo = localStorage.getItem("todo");
  if (myTodo) {
    const todoItems = JSON.parse(myTodo);
    todoItems.forEach((todo) => addUi(todo));
    myTodos = todoItems;
  }
});

addTodoForm.addEventListener("submit", addTodo);

removeAllTodos.addEventListener("click", () => {
  todoList.innerHTML = "";
  myTodos = [];
  localStorage.removeItem("todo");
});

function addTodo(e) {
  e.preventDefault();

  const todoText = addInput.value.trim();
  if (todoText.length > 0) {
    addUi(todoText);
    myTodos.push(todoText);
    addStorage();
  } else {
    alert("Dəyər daxil edin");
  }
  addInput.value = "";
}

function deleteTodo(todoElement) {
  const todoText = todoElement.parentElement.textContent.trim();
  todoElement.parentElement.remove();
  removeTodoStorage(todoText);
}

function addStorage() {
  localStorage.setItem("todo", JSON.stringify(myTodos));
}

function addUi(todoText) {
  todoList.innerHTML += `
    <li class="list-elem">
      ${todoText}
      <a href="#!" onclick="deleteTodo(this)"><i class="fa-solid fa-xmark delete-btn"></i></a>
    </li>
  `;
}

function removeTodoStorage(todoText) {
  myTodos = myTodos.filter((todo) => todo !== todoText);
  addStorage();
}
