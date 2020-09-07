let addTaskBtn = document.querySelector('.add-task');
let tasksContainer = document.querySelector('.tasks-container');
let finishedTasksContainer = document.querySelector('.finsihed-tasks-container');
let taskTextBox = document.querySelector('input#write-task-input');
let finishAll = document.querySelector('.all-operations span:first-of-type');
let deleteAll = document.querySelector('.all-operations span:last-of-type');

//get current tasks from local storage
if (localStorage.current_tasks) {
    JSON.parse(localStorage.current_tasks).forEach(item => {
        let a = document.createElement('div');
        tasksContainer.appendChild(a);
        a.outerHTML = item;
    });
}
//get finished tasks from local storage
if (localStorage.finished_tasks) {
    JSON.parse(localStorage.finished_tasks).forEach(item => {
        let finishedTask = document.createElement('div');
        finishedTasksContainer.appendChild(finishedTask);
        finishedTask.outerHTML = item;
        //setting the created element to the html from 'item' put in the html document
        finishedTask = finishedTasksContainer.children[finishedTasksContainer.children.length - 1];
        //add event listener for hover
        finishedTask.addEventListener('mouseenter', () => finishedTask.querySelector('span.remove-finished').style.display = 'inline');
        finishedTask.addEventListener('mouseleave', () => finishedTask.querySelector('span.remove-finished').style.display = 'none');
    });
}

checkIfNoTasks();
checkIfNoFinishedTasks();
checkTasksCount();

window.onload = () => taskTextBox.focus();

//adding clicking event listeners to elements in the document (.finished-task elements have mouseenter and mouseleave listeners that aren't put here )

addTaskBtn.onclick = document.querySelector('.write-task form').onsubmit = function (e) {
    e.preventDefault();
    if (taskTextBox.value === '') {
        sweetAlert('please add some text to the new task');
    } else {
        if (Array.from(document.querySelectorAll('.task')).map(x => x.firstElementChild.textContent).includes(taskTextBox.value)) {
            sweetAlert('task already written');
        } else {
            addTask();
        }
    }
}

finishAll.onclick = function () {
    document.querySelectorAll('.task').forEach(task => {
        task.querySelector('span:nth-of-type(2)').click();
    });
}
deleteAll.onclick = function () {
    document.querySelectorAll('.task').forEach(task => {
        task.querySelector('span:last-of-type').click();
    });
}

document.body.addEventListener('click', function (e) {
    if (Array.from(document.querySelectorAll('.task span:last-of-type')).includes(e.target)) {
        deleteTask(e.target);
    } else if (Array.from(document.querySelectorAll('.task span:nth-of-type(2)')).includes(e.target)) {
        finishTask(e.target);
    } else if (Array.from(document.querySelectorAll('.finsihed-tasks-container .finished-task span.remove-finished')).includes(e.target)) {
        removeFinishedTask(e.target);
    }
})


function checkIfNoTasks() {
    if (document.querySelectorAll('.task').length === 0) {
        let noTasksDiv = document.createElement('div');
        tasksContainer.appendChild(noTasksDiv);
        noTasksDiv.outerHTML = `<div class="no-task">There is currently no tasks</div>`;
    }
}

function checkIfNoFinishedTasks() {
    if (document.querySelectorAll('.finished-task').length === 0) {
        let noFinishedTasksDiv = document.createElement('div');
        finishedTasksContainer.appendChild(noFinishedTasksDiv);
        noFinishedTasksDiv.outerHTML = `<div class="no-finished-tasks">There is currently no finished tasks</div>`;
    }
}

function addTask() {
    let newDiv = document.createElement('div');
    tasksContainer.appendChild(newDiv);
    newDiv.outerHTML = `<div class="task"><span>${taskTextBox.value}</span><span>finished</span><span>delete</span></div>`;
    //local storage
    window.localStorage.setItem('current_tasks', JSON.stringify(Array.from(document.querySelectorAll('.task')).map(task => task.outerHTML)));
    taskTextBox.value = '';
    checkTasksCount();
    //remove no tasks div if found
    if (document.querySelector('.no-task')) document.querySelector('.no-task').remove();
}

function deleteTask(target) {
    target.parentNode.remove();
    window.localStorage.setItem('current_tasks', JSON.stringify(Array.from(document.querySelectorAll('.task')).map(task => task.outerHTML)));
    checkIfNoTasks();
    checkTasksCount();
}

function finishTask(target) {
    //remove no finished tasks div if found
    if (document.querySelector('.no-finished-tasks')) document.querySelector('.no-finished-tasks').remove();
    let taskText = target.parentNode.firstElementChild.textContent;
    let finishedTask = document.createElement('div');
    finishedTasksContainer.appendChild(finishedTask);
    finishedTask.outerHTML = `<div class="finished-task"><span>${taskText}</span><span class='remove-finished' style='display: none;'>x</span>`;
    //local storage
    localStorage.setItem('finished_tasks', JSON.stringify(Array.from(document.querySelectorAll('.finished-task')).map(task => task.outerHTML)));
    //making the finishedTask variable point to the added html element instead of pointing to the empty div (outer html line doesn't change the variable - it changes the html element in the document only)
    finishedTask = finishedTasksContainer.children[finishedTasksContainer.children.length - 1];
    //add event listener for hover
    finishedTask.addEventListener('mouseenter', () => finishedTask.querySelector('span.remove-finished').style.display = 'inline');
    finishedTask.addEventListener('mouseleave', () => finishedTask.querySelector('span.remove-finished').style.display = 'none');
    target.parentNode.remove();
    window.localStorage.setItem('current_tasks', JSON.stringify(Array.from(document.querySelectorAll('.task')).map(task => task.outerHTML)));
    checkTasksCount();
    checkIfNoTasks();
}

function removeFinishedTask(target) {
    target.parentNode.remove();
    localStorage.setItem('finished_tasks', JSON.stringify(Array.from(document.querySelectorAll('.finished-task')).map(task => task.outerHTML)));
    checkIfNoFinishedTasks();
    checkTasksCount();
}

function checkTasksCount() {
    document.querySelector('.tasks-info .current-tasks-count span').textContent = document.querySelectorAll('.task').length;
    document.querySelector('.tasks-info .finished-tasks-count span').textContent = document.querySelectorAll('.finished-task').length;
}

function sweetAlert(msg) {
    Swal.fire({
        icon: 'error',
        text: `${msg}`,
        showConfirmButton: true,
        timer: 2500
    })
}