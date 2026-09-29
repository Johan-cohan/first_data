const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
let tasks = [];
const STORAGE_KEY = "tasks";

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = task;
    deleteButton.textContent = "Х";

    deleteButton.addEventListener("click", () => {
      removeTask(index);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    return;
  }

  tasks = JSON.parse(saved);
  renderTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push(text);
  taskInput.value = "";
  renderTasks();
  saveTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
