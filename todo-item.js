class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const todoText = this.getAttribute('text');
        const index = this.getAttribute('index');
        this.shadowRoot.innerHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${todoText}
                <button class="btn btn-danger btn-sm" data-index="${index}">Delete</button>
            </li>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const event = new CustomEvent('delete', { bubbles: true, composed: true, detail: { index } })
            this.dispatchEvent(event);
        });
    }
}

customElements.define('todo-item', TodoItem);
