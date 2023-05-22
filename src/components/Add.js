// import necessary modules
import '../App.css'
import { addTodo} from '../store/todo';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Add() {
    // set up useState
    const [newItem, setNewItem] = useState('');
    const dispatch = useDispatch();

    // handl the add function
    const handleAdd = (e) => {
        e.preventDefault();
        if (newItem === '') {
            return;
        }
            dispatch(addTodo(String(newItem)));
            setNewItem('');
        };

    return (
    <>
        {/* form to add a new list item */}
        <form className='add-container'>
            <label>
                <input
                className='add-todo'
                name='value'
                type='text'
                onChange={(e) => setNewItem(e.target.value)}
                value={newItem}
                placeholder='e.g Learn Next.js...'
                />
            </label>
            <button className='add-button' type='submit' onClick={handleAdd}>
                +
            </button>
        </form>
    </>
    )
}

export default Add


