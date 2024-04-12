const addTodoForm = document.querySelector("#add-body");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".list-body");
const removeAllTodos = document.querySelector("#remove-all-Todos")

addTodoForm.addEventListener("submit", addTodo);
removeAllTodos.addEventListener('click',()=>{
    todoList.innerHTML = ''
})
function addTodo(e) {
  e.preventDefault();

  if (addInput.value.length > 0 && addInput.value.trim() !== "" ) {
    todoList.innerHTML += `
     <li class="list-elem">
       ${addInput.value}
       <a href="#!" onclick="deleteTodo(this)"><i class="fa-solid fa-xmark delete-btn"></i></a>
     </li>`;
  } else {
    alert("Dəyər daxil edin");
  }
  addInput.value = "";
}



function deleteTodo(list){
    list.parentElement.remove()

}