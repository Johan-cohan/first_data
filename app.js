const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];
const STORAGE_KEY = "tasks";

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    taskCounter.style.display = "none";
  } else {
    emptyMessage.style.display = "none";
    taskCounter.style.display = "block";
  }
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const startButton = document.createElement("button");
    const pauseButton = document.createElement("button");

    span.textContent = task.text;
    deleteButton.textContent = "Х";

    deleteButton.addEventListener("click", () => {
      removeTask(index);
    });

    startButton.textContent = "⏵";
    pauseButton.textContent = "⏸";

    startButton.addEventListener("click", () => {
      startTimer(index);
    });

    pauseButton.addEventListener("click", () => {
      pauseTimer(index);
    });

    li.appendChild(span);
    li.appendChild(startButton);
    li.appendChild(pauseButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  taskCounter.textContent = `Всего: ${tasks.length}`;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return;

  const parsed = JSON.parse(saved);

  tasks = parsed.map((item) => {
    if (typeof item === "string") {
      return { text: item, seconds: 0, running: false };
    }
    return item;
  });
  saveTasks();
  renderTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, seconds: 0, running: false });
  taskInput.value = "";
  renderTasks();
  saveTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

function startTimer(index) {
  tasks[index].running = true;
  saveTasks();
  renderTasks();
}

function pauseTimer(index) {
  tasks[index].running = false;
  saveTasks();
  renderTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
