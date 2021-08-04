type Todo = {
  text: string;
  label: string;
  complete: boolean;
};




type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = () => void;
type RemoveTodo = (id: number) => void;
type EditTodo = (idx: number) => void;

type AddHandler = (params: { text: string, label: string })  => void;
type EditHandler = (params: { text: string, label: string, idx: number })  => void;

type AddHistory = (obj: { type: string, text: string  }) => void;

type CloseModal = () => void;