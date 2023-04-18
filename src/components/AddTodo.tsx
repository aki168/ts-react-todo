interface Props {
  handleSubmit: React.FormEventHandler,
  current: string,
  setCurrent: (currentValue: string) => void,
}

export const AddTodo = ({handleSubmit, current, setCurrent}: Props) => {

  return (
    <form
      onSubmit={handleSubmit}
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
  );
};
