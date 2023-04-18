import { Todo } from "../types/Todo";

export const TodoItem = ({
  todo,
  handleEdit,
  delTodo,
  handleChecked,
}: {
  todo: Todo;
  handleEdit: (id: number, todoValue: string) => void;
  delTodo: (id: number) => void;
  handleChecked: (id: number, isCheck: boolean) => void;
}) => {
  const { id, inputValue, checked } = todo;
  return (
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
  );
};
