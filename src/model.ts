export interface Todo {
    id: number;
    todoText: string;
    isDone: boolean;
}

// type Actions = 
//     | {type:'add', payload:string}
//     | {type:'remove', payload:number}
//     | {type:'done', payload:number}

// const TodoReducer = (state:Todo[], action: Actions)=> {
//     switch(action.type){
//         case "add":
//             return [
//                 ...state,
//                 {
//                     id: Date.now(),
//                     todo: action.payload,
//                     isDone: false
//                 }
//             ]
//         case "remove":
//             return state.filter((todo) => todo.id !== action.payload);
//         case "done":
//             return state.map((todo) => {
//                 if(todo.id === action.payload){
//                     return {
//                         ...todo,
//                         isDone: !todo.isDone
//                     }
//                 }
//                 return todo
//             })
//         default:
//             return state
//     }
// }
// import { useReducer } from "react";

// const ReducerExample = () => {
//     const [state, dispatch] = useReducer(TodoReducer, [])
//     return (
//         <div/>
//     )
// }

// export default ReducerExample