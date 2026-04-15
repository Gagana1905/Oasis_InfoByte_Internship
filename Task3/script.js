let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    if (title === "") {
        alert("Please enter title");
        return;
    }

    let task = {
        id: Date.now(),
        title,
        desc,
        completed: false,
        time: new Date().toLocaleString()
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}

function displayTasks() {
    let pending = document.getElementById("pending");
    let completed = document.getElementById("completed");

    pending.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
            <div class="task-info">
                <strong>${task.title}</strong>
                <p>${task.desc}</p>
                <small>${task.time}</small>
            </div>
            <div class="actions">
                ${
                    !task.completed
                    ? `<button class="complete" onclick="markComplete(${task.id})">✔</button>`
                    : ""
                }
                <button class="delete" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;

        if (task.completed) {
            completed.appendChild(div);
        } else {
            pending.appendChild(div);
        }
    });
}

function markComplete(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: true} : t);
    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    displayTasks();
}

displayTasks();
