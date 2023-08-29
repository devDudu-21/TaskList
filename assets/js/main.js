const addTask = document.querySelector('.btn-add')
const taskList = document.querySelector('.task-list')
const inputTask = document.querySelector('.input-task')

function createLi() {
    const li = document.createElement('li');
    return li;
}

function createDeleteButton(li) {
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Apagar';
    deleteButton.setAttribute('class', 'delete')
    deleteButton.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(deleteButton)
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput
    taskList.appendChild(li)
    clearInput()
    createDeleteButton(li)
    saveTask()
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function saveTask() {
    const liTasks = taskList.querySelectorAll('li')
    const arrayTask = []

    for (let task of liTasks) {
        let taskText = task.innerText
        taskText = taskText.replace('Apagar', '').trim()
        arrayTask.push(taskText)
    }

    const tasksJson = JSON.stringify(arrayTask)
    localStorage.setItem('tasks', tasksJson)
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tasks')
    const arrayTask = JSON.parse(tasks)

    for (let task of arrayTask) {
        createTask(task)
    }
}
addSaveTasks()

inputTask.addEventListener('keypress', function (ev) {
    if (ev.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value)
    }
})


addTask.addEventListener('click', function (ev) {
    if (!inputTask.value) return;
    createTask(inputTask.value)
})

document.addEventListener('click', function (ev) {
    const el = ev.target
    if (el.classList.contains('delete')) {
        el.parentElement.remove()
        saveTask()
    }
    inputTask.focus();
})