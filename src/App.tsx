import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");
  const storedTodos: string | null = localStorage.getItem("todos");
  const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>((initialTodos))
  const storedCompletedTodos: string | null = localStorage.getItem("completedTodos");
  const initialCompletedTodos: Todo[] = storedCompletedTodos ? JSON.parse(storedCompletedTodos) : [];
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(initialCompletedTodos)

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
  }, [todos, completedTodos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todoText) {
      setTodos([...todos, { id: Date.now(), todoText: todoText, isDone: false }])
      setTodoText("");

    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    let add, active = todos, complete = completedTodos;
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">What Should I Do?</span>
        <InputField todoText={todoText} setTodoText={setTodoText} handleAdd={(e) => handleAdd(e)} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>


  );
}

export default App;
