import { useEffect, useState } from "react";

import { Todo } from "./types/Todo";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";

function App() {
  const [todoLocal, setTodoLocal] = useState<string>(
    localStorage.getItem("myTodos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [current, setCurrent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!current) return;

    const newTodo: Todo = {
      inputValue: current,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setCurrent("");
  };

  const handleEdit = (id: number, todoValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = todoValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, isCheck: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !isCheck;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const delTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    window.localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todoList = JSON.parse(todoLocal);
    setTodos(todoList);
  }, []);

  return (
    <div className="App">
      <header className="image-container">
        <div className="text">TODO</div>
      </header>
      <div className="container mx-auto py-5 max-h-screen">
        <section className="p-5">
          <h1 className="text-center text-3xl font-bold  text-cyan-700 mb-6">
            TODO リスト
            <span className="text-sm px-1 text-teal-700">
              with TypeScript & React
            </span>
          </h1>
          <AddTodo
            handleSubmit={handleSubmit}
            current={current}
            setCurrent={setCurrent}
          />
          <ul className="w-[70%] mx-auto">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleChecked={handleChecked}
                handleEdit={handleEdit}
                delTodo={delTodo}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
export default App;
