const btn = document.querySelector(".btn");
const inputTask = document.getElementById("input-task");
const taskList = document.querySelector(".task-list");

function addTask() {
    if (inputTask.value !== "") {
        const li = document.createElement("li");
        li.textContent = inputTask.value;
        taskList.appendChild(li);

        li.addEventListener("click", function() {
            this.remove();
            updateLocalStorage(); 
        });

        inputTask.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const taskItems = document.querySelectorAll(".task-list li");
    const tasks = [];

    taskItems.forEach(item => {
        tasks.push(item.textContent); 
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;

        li.addEventListener("click", function() {
            this.remove();
            updateLocalStorage(); 
        });

        taskList.appendChild(li); 
    });
}

btn.addEventListener("click", addTask);

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

loadTasks();