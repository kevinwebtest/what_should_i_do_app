import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoText)

  const handleDone = (id: number) => {
    if (!edit) {
      setTodos(
        todos.map((todo) => (
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ))
      )

    }
  }

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todo) =>
        todo.id !== id
      )
    )
  }

  const handleEdit = (id: number) => { //For clicking the pencil icon
    if (!todo.isDone) {
      setEdit(!edit)
    }
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, todoText: editTodo } : todo
    )))
  }

  const handleEditChange = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, todoText: editTodo } : todo
    )))
    //Change input bar into span again after submitting
    setEdit(false)
  }

  //Focus on input when clicked
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form 
            className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEditChange(e, todo.id)} 
            ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {
              edit ? (
                <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text" />
              ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todoText}</s>
              ) : (
                <span className="todos__single--text">{todo.todoText}</span>
              )
            }
            <div>
              <span className="icon" onClick={() => handleEdit(todo.id)}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo