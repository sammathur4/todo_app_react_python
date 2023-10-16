import React from 'react'
import { useForm } from "react-hook-form";




const Search = ({ addTodo }) =>
{
    const { register, handleSubmit, reset, formState: { error } } = useForm();

    return (
        <div className="todo-search">
            <form action='' onSubmit={handleSubmit((data) => {addTodo(data);
            reset()})}>

                <input type="text" id ="task" placeholder='Enter Todo' { ...register("task", {required:true}, )} />
                <button>Add</button>
            </form>
        </div>
    )
}


export default Search