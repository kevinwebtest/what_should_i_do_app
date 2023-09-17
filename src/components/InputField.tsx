import React, { useRef } from 'react'
import './styles.css'

interface Props{
    todoText: string;
    setTodoText: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent)=> void;
}

const InputField: React.FC<Props> = ({todoText, setTodoText, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' 
        onSubmit={(e)=>{
            handleAdd(e)
            inputRef.current?.blur();
        }}
    >
        <input type="text" 
            ref={inputRef}
            value={todoText}
            onChange={e => setTodoText(e.target.value)}
            className="input__box" placeholder='Enter a task' />
        <button className='input__submit' type='submit'>GO</button>
    </form>
  )
}

export default InputField