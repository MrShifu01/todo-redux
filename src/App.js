// Import important components and hooks
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo, completedTodo } from './store/todo';
import { useState } from 'react';

// Creating the main App component
function App() {
  // setting up some hooks
  const [newItem, setNewItem] = useState('');
  const [editedItem, setEditedItem] = useState('');
  const [editedItemId, setEditedItemId] = useState('');
  const [editButton, setEditButton] = useState(false);

  const todo = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();

  // handle the adding of a new item
  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem === '') {
      return;
    }
    dispatch(addTodo(String(newItem)));
    setNewItem('');
  };

  // handle deleting an item
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteTodo(id));
  };

  // Handle toggling the edit form for an item
  const handleEditButton = (e, id) => {
    e.preventDefault();
    setEditButton((prevEditButton) => !prevEditButton);
    setEditedItemId(id);
  };

  // Handle the actual edit of an item
  const handleEdit = (e, id, isCompleted) => {
    e.preventDefault();
    dispatch(editTodo({ id, input: editedItem }));
    setEditedItem('');
    if (isCompleted) {
      handleCompleted(e, id)
    }
    
  };

  // Handle toggling the completion status of an item
  const handleCompleted = (e, id) => {
    e.preventDefault();
    dispatch(completedTodo(id));
  };

  return (
    <div className='total-container'>
      <h1>things to do.</h1>
      {/* Printing the List */}
      <div className='todo-container'>
        
        {Object.keys(todo).map((id) => {
          const item = todo[id];
          const isCompleted = item.completed;

          return (
            
            // List Items
            <div className='todo-item-container ' key={id}>

                <div className='input-toggle'>
                  <div className='left-todo'>
                      {/* Completed Button */}
                      <button 
                      className={`complete-button ${isCompleted ? 'completed-fill' : ""}`}
                      onClick={(e) => handleCompleted(e, id)}>{isCompleted ? <i class='bx bx-check'></i> : ''}
                      </button>
                      <div className={`todo-item-container ${isCompleted ? 'list-item-completed' : 'list-item'}`}>
                        {/* List Content */}
                        {item.content}
                      </div>

                  </div>
                      {/* Edit an Item Section */}
                  <form 
                      className={`edit-form ${editButton && editedItemId === id ? 'show-edit' : 'hide-edit'}`}>
                          <label>
                            <input
                              type='text'
                              className='edit-input'
                              name='value'
                              onChange={(e) => setEditedItem(e.target.value)}
                              value={editedItem}
                            />
                          </label>
                          <button 
                          className='edit-button' 
                          value={id} type='submit' 
                          onClick={(e) => handleEdit(e, id, isCompleted)}>
                            Edit
                          </button>
                  </form>
                </div>
                <div className='right-todo'>
                    {/* Delete Button */}
                    <button 
                    value={id} 
                    className='delete-button' 
                    type='button' 
                    onClick={(e) => handleDelete(e, id)}>
                      X
                    </button>



                    {/* Edit button to toggle the edit form */}
                    <button 
                    className='edit-button'
                    type='button' 
                    onClick={(e) => handleEditButton(e, id)}>
                    {editButton && editedItemId === id ? "Cancel" : 'Edit'}
                    </button>
                </div>



              
            </div>
          );
        })}
      </div>

      {/* Adding new items */}
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
    
    </div>
  );
}

export default App;
