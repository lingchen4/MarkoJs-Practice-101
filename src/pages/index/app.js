const EventEmitter = require("events");

let nextId = 0;

class TodoApp extends EventEmitter {
  constructor() {
    super();
    this._todos = [
      {
        title: "Learn marko",
        completed: true,
        id: nextId++,
      },
      {
        title: "Build an awesome web app",
        completed: false,
        id: nextId++,
      },
      {
        title: "Profit",
        completed: false,
        id: nextId++,
      },
    ];

    this._filter = "all";
  }

  get todos() {
    return this._todos;
  }

  set todos(newTodos) {
    this._todos = newTodos;
    this._emitChange();
  }

  get filter() {
    return this._filter;
  }

  set filter(newFilter) {
    if (this._filter === newFilter) return;
    this._filter = newFilter;
    this._emitChange();
  }

  _emitChange() {
    this.emit("change", {
      todos: this._todos,
      filter: this._filter,
    });
  }

  updateTodo(id, newProps) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo = { ...todo, ...newProps };
      }
      return todo;
    });
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  setTodoCompleted(id, completed) {
    this.updateTodo(id, { completed });
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => todo.completed !== true);
  }

  toggleAllTodosCompleted(completed) {
    this.todos = this.todos.map((todo) => {
      return { ...todo, completed };
    });
  }

  addNewTodo(title) {
    this.todos = this.todos.concat({
      title,
      id: "c" + nextId++,
      completed: false,
    });
  }
}

module.exports = new TodoApp();
