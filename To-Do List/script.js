const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// adds a task to task list
function addTask() {
    const task = inputBox.value.trim();
    if(!task) {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span id="task">${task}</span>
        </label>
        <span class="delete-button">Delete</span>
        <span class="edit-button">Edit</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";

    updateCounters();

    const checkbox = li.querySelector("input");
    const editButton = li.querySelector(".edit-button");
    const taskSpan = li.querySelector("span");
    const deleteButton = li.querySelector(".delete-button");

    // reaction to checkbox being clicked
    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // reaction to task being edited
    editButton.addEventListener("click", function() {
        const update = prompt("Edit task:", taskSpan.textContent);
        if(update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // reaction to task being deleted
    deleteButton.addEventListener("click", function() {
        if(confirm("Are you sure you'd like to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
}

// updates completed/uncompleted task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

