import '../App.css'
import { addTodo} from '../store/todo';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Add() {
    const [newItem, setNewItem] = useState('');
    const dispatch = useDispatch();

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


