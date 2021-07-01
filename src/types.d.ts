type Todo = {
  text: string;
  complete: boolean;
};



type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = (obj: object) => void;
type RemoveTodo = (id: number) => void;

type AddHandler = (text: string)  => void;

type AddHistory = (obj: { type: string, text: string  }) => void;
