export function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoList = document.querySelector('todo-list');
        todoList.addTodoItem(todoText);
        todoInput.value = '';
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'maintenance') {
            const overlay = document.getElementById('overlay');
            if (event.data.state) {
                overlay.style.display = 'flex';
            } else {
                overlay.style.display = 'none';
            }
        }
    });
    fetch('/static/isUnderMaintenance.json').then(response => {
        if (response.status === 200) {
            document.getElementById('overlay').style.display = 'flex';
        }
    }).catch(() => {
        document.getElementById('overlay').style.display = 'none';
    });
}
