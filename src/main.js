const AddButton = document.getElementById('add-tasks-button');
const AddDialog = document.getElementById('Add-new-task');
const confirmButton = document.getElementById('confirm-task-button');
const cancelButton = document.querySelector('button[value="cancel"]');
const DisplayTasks = document.getElementById('DisplayTasks');

const taskNameInput = document.getElementById('task-name');
const taskDescInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const dueDateInput = document.getElementById('due-date');
const dialogTitle = AddDialog.querySelector('h2');

let TaskList = []; 
let isEditing = false;
let editingIndex = -1;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(TaskList));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks && storedTasks !== '0') {
        TaskList = JSON.parse(storedTasks);
    }
    printTasks();
}

AddButton.addEventListener('click', () => {
    taskNameInput.value = '';
    taskDescInput.value = '';
    priorityInput.value = 'Low'; 
    dueDateInput.value = '';
    isEditing = false;
    editingIndex = -1;
    dialogTitle.textContent = 'Add New Task';
    confirmButton.textContent = 'Add Task';
    AddDialog.showModal();
});

function AddTask(TaskName, TaskDesc, priority, DueDate) {
    TaskList.push({
        name: TaskName,
        description: TaskDesc,
        priority: priority,
        dueDate: DueDate,
    });
    printTasks();
    saveTasks();
}

function DeleteTask(index) {
    TaskList.splice(index, 1);
    printTasks();
    saveTasks();
}

function EditTask(index) {
    const Task = TaskList[index];
    
    taskNameInput.value = Task.name;
    taskDescInput.value = Task.description;
    priorityInput.value = Task.priority;
    dueDateInput.value = Task.dueDate;
    
    isEditing = true;
    editingIndex = index;
    
    dialogTitle.textContent = 'Edit Task';
    confirmButton.textContent = 'Save Changes';
    
    AddDialog.showModal();
}

function printTasks() {
    DisplayTasks.innerHTML = "";
    
    TaskList.forEach((task, i) => {
        let color;
        switch (task.priority) {
            case 'High':
                color = 'red';
                break;
            case 'Medium':
                color = 'orange';
                break;
            default:
                color = 'green';
                break;
        }

        // Added Delete and Edit buttons with inline onclick events
        DisplayTasks.innerHTML += `
        <div style="border:2px solid ${color}; padding:10px; margin:10px;">
            <h3>${task.name}</h3>
            <p>Description: ${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Due Date: ${task.dueDate}</p>
            <button onclick="DeleteTask(${i})">Delete Task</button>
            <button onclick="EditTask(${i})">Edit Task</button>
        </div>`;
    });
}

confirmButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const TaskName = taskNameInput.value;
    const TaskDesc = taskDescInput.value;
    const priority = priorityInput.value;
    const DueDate = dueDateInput.value;
    
    if (TaskName.trim() === "" || DueDate.trim() === "") {
        alert("Please enter a Task Name and Due Date.");
        return; 
    }

    if (isEditing) {
        if (editingIndex !== -1) {
            TaskList[editingIndex] = {
                name: TaskName,
                description: TaskDesc,
                priority: priority,
                dueDate: DueDate,
            };
            isEditing = false;
            editingIndex = -1;
        }
    } else {
        AddTask(TaskName, TaskDesc, priority, DueDate);
    }
    
    printTasks(); 
    saveTasks(); 
    AddDialog.close();
});

cancelButton.addEventListener('click', () => {
    AddDialog.close();
});

loadTasks();