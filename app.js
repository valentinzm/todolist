document.querySelector('#form').addEventListener('submit', addToDo);
const list = document.querySelector('#list');


function card(title, id, completed) {
    return `
    <div class="card mb-3 checked-${completed}">
    <div class="card-body">
        <p class="card-text">${title}</p>
        <button class="btn btn-primary" onClick="markTodo(${id})">Отметить</button>
        <button class="btn btn-danger" onClick="removeTodo(${id})">Удалить</button>
    </div>
    </div>
    `
}
let todos = [];
if (localStorage.getItem("storageTodos") !== null) {
    let session = JSON.parse(localStorage.getItem('storageTodos'));
    todos = session;
    createList(todos)
}

function addToDo(event) {
    event.preventDefault();

    if (!this.action.value == '') {
        todos.push({ id: Date.now(), title: this.action.value, completed: false, });
        createList(todos);
        this.action.classList.remove('is-invalid');
        this.action.value = '';
    } else {
        this.action.classList.add('is-invalid');
    }

}

function markTodo(id) {
    let markedTodo = todos.find(todo => todo.id == id);
    markedTodo.completed = true;
    createList(todos)
}

function removeTodo(id) {
    let newTodo = todos.filter(todo => todo.id !== id);
    todos = newTodo;
    createList(todos)
}

function createList(todos) {
    let newList = todos.map(todo => card(todo.title, todo.id, todo.completed))
    let todosHTML = newList.join(' ');
    if (Object.keys(todos).length !== 0) {
        list.innerHTML = todosHTML;
    } else {
        list.innerHTML = '<p>Задач нет</p>';
    }
    localStorage.setItem('storageTodos', JSON.stringify(todos));
}