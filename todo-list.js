class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.addEventListener('delete', (event) => {
            this.deleteTodoItem(event.detail.index);
        });
    }

    addTodoItem(todoText) {
        this.todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.render();
    }

    deleteTodoItem(index) {
        this.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <ul id="todo-list" class="list-group">
                ${this.todos.map((todo, index) => `
                    <todo-item text="${todo}" index="${index}" ondelete="${this.deleteTodoItem}"></todo-item>
                `).join('')}
            </ul>
        `;
    }
}

customElements.define('todo-list', TodoList);
