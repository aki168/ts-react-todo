import { useEffect, useState } from "react";

function App() {
  const [todoLocal, setTodoLocal] = useState<string>(
    localStorage.getItem("myTodos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [current, setCurrent] = useState("");

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

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

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-center gap-2 mb-4"
          >
            <input
              value={current}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCurrent(e.target.value);
              }}
              type="text"
              className="px-2 border-b "
            />{" "}
            <input
              type="submit"
              value={"作成"}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 focus:ring ring-offset-1 focus:ring-green-300"
            />
          </form>

          <ul className="w-[70%] mx-auto">
            {todos.map(({ inputValue, id, checked }) => (
              <li key={id} className="flex justify-center gap-2 mb-2">
                <input
                  onChange={(e) => handleEdit(id, e.target.value)}
                  value={inputValue}
                  disabled={checked === true}
                  type="text"
                  className="px-2 border-b border-cyan-500"
                />
                <input
                  onChange={(e) => handleChecked(id, checked)}
                  type="checkbox"
                  className="my-auto w-8 h-8"
                />
                <button
                  onClick={(e) => delTodo(id)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 focus:ring ring-offset-1 focus:ring-cyan-300"
                >
                  消
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
