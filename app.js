let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let todoList = document.getElementById("todoList");

let todos = [];

addTaskBtn.addEventListener("click", function () {
  addTask(taskInput.value);
});

taskInput.addEventListener("keypress", function (keyObject) {
  if (keyObject.key === "Enter") {
    addTask(taskInput.value);
  }
});

// add task
function addTask(item) {
  if (item == "") {
    alert("Task should not be blank!");
    return;
  }
  todos.push(item);

  // save to local storage
  saveToLocalStorage();

  // clear inpute value
  taskInput.value = "";
  // redner items
  renderHtml();
}

// remove item
function removeItem(itemToRemove) {
  // find the index
  let index = todos.indexOf(itemToRemove);

  //remove the item from the array list
  todos.splice(index, 1);

  // save to local storage
  saveToLocalStorage();

  // refresh
  renderHtml();
}

// save to local storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// render html
function renderHtml() {
  todoList.innerHTML = "";

  todos.forEach(function (item) {
    let li = document.createElement("li");
    li.innerHTML = item + `<span onclick='removeItem("${item}")'>X</span>`;
    todoList.appendChild(li);
  });
}

// on load
window.onload = function () {
  let getLocalStorageItems = localStorage.getItem("todos");

  if (getLocalStorageItems) {
    todos = JSON.parse(getLocalStorageItems);
  }

  renderHtml();
};
