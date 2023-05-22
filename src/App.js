import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {addTodo, deleteTodo, editTodo, completedTodo} from './store/todo'
import { useState } from 'react';

function App() {
  const [newItem, setNewItem] = useState('')
  const [editedItem, setEditedItem] = useState('')
  const [editedItemId, setEditedItemId] = useState('')
  const [editButton, setEditButton] = useState(false)
  const [completed, setCompleted] = useState(false)

  const todo = useSelector((state) => state.todo.data)

  const dispatch = useDispatch()

  // handle the adding of a new item
  const handleAdd = (e) => {
    e.preventDefault()
    if (newItem === '') {
      return
    }
    dispatch(addTodo(String(newItem)))
    setNewItem('')
  }

  // handle deleting of an item
  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteTodo(id))
  }

  // Handle the editing of an item

  const handleEditButton = (e, id) => {
    e.preventDefault()
    setEditButton(prevEditButton => !prevEditButton)
    setEditedItemId(id)
  }

  // handle the actual edit

  const handleEdit = (e, id) => {
    e.preventDefault()
    dispatch(editTodo({id, input: editedItem}))
    setCompleted(false)
    setEditedItem('')
  }   

  // handle the toggle of completed or not completed

  const handleCompleted = (e, id) => {
    e.preventDefault()
    dispatch(completedTodo(id))
    setCompleted(prevCompleted => !prevCompleted)
  }

  return (
    <>
    {/* Printing the List */}
      <div>
        {Object.keys(todo).map((id) => 
          <div 
          className={completed ? 'list-item-completed' : 'list-item'}
          key={id}>{todo[id].content}
            {/* Delete Button */}
            <button value={id} className='delete-button' type='button'
            onClick={(e) => handleDelete(e, id)}>Delete</button>

            {/* Edit button to toggle the edit form */}
            <button type='button' onClick={(e) => handleEditButton(e, id)}>Edit</button>

            {/* Edit an Item Section */}
            <form className={editButton && editedItemId === id ? 'show-edit' : 'hide-edit'}>
              <label>
                <input 
                type='text' 
                className="edit-input"
                name='value'
                onChange={(e) => setEditedItem(e.target.value)}
                value={editedItem}
                />
              </label>
              <button
              className="edit-button"
              value={id}
              type='submit'
              onClick={(e) => handleEdit(e, id)}
              >
                Confirm Edit
              </button>
            </form>

            {/* Completed Button */}
            <button
            onClick={(e) => handleCompleted(e, id)}
            >
              Completed
            </button>

          </div>

        )}
      </div>


{/* Adding new items */}
      <form>
        <label>
          <input
          className='add-todo'
          name='value'
          type='text'
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          />
        </label>
        <button className='add-button' type='submit' onClick={handleAdd}>Add Todo</button>
      </form>

    </>
  );
}

export default App;
