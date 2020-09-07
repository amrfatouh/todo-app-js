let addTaskBtn = document.querySelector('.add-task');
let tasksContainer = document.querySelector('.tasks-container');
let finishedTasksContainer = document.querySelector('.finsihed-tasks-container');
let taskTextBox = document.querySelector('input#write-task-input');

checkIfNoTasks();
checkTasksCount();

addTaskBtn.onclick = document.querySelector('.write-task form').onsubmit = function (e) {
    e.preventDefault();
    if (taskTextBox.value === '') {
        alert('please add some text to the new task');
    } else {
        if (Array.from(document.querySelectorAll('.task')).map(x => x.firstElementChild.textContent).includes(taskTextBox.value)) {
            alert('task already written');
        } else {
            addTask();
        }
    }
}

document.body.addEventListener('click', function (e) {
    if (Array.from(document.querySelectorAll('.task span:last-of-type')).includes(e.target)) {
        deteteTask(e);
    } else if (Array.from(document.querySelectorAll('.task span:nth-of-type(2)')).includes(e.target)) {
        finishTask(e);
    }
})

function checkIfNoTasks() {
    if (document.querySelectorAll('.task').length === 0) {
        let noTasksDiv = document.createElement('div');
        tasksContainer.appendChild(noTasksDiv);
        noTasksDiv.outerHTML = `<div class="no-task">There is currently no tasks</div>`;
    }
}

function addTask() {
    let newDiv = document.createElement('div');
    tasksContainer.appendChild(newDiv);
    newDiv.outerHTML = `<div class="task"><span>${taskTextBox.value}</span><span>finished</span><span>delete</span></div>`;
    taskTextBox.value = '';
    checkTasksCount();
    //remove no tasks div if found
    if (document.querySelector('.no-task')) document.querySelector('.no-task').remove();
}

function deteteTask(e) {
    e.target.parentNode.remove();
    checkIfNoTasks();
    checkTasksCount();
}

function finishTask(e) {
    if (document.querySelector('.no-finished-tasks')) document.querySelector('.no-finished-tasks').remove();
    let taskText = e.target.parentNode.firstElementChild.textContent;
    let finishedTask = document.createElement('div');
    finishedTasksContainer.appendChild(finishedTask);
    finishedTask.outerHTML = `<div class="finished-task">${taskText}</div>`;
    e.target.parentNode.remove();
    checkTasksCount();
}

function checkTasksCount() {
    document.querySelector('.tasks-info .current-tasks-count span').textContent = document.querySelectorAll('.task').length;
    document.querySelector('.tasks-info .finished-tasks-count span').textContent = document.querySelectorAll('.finished-task').length;
}