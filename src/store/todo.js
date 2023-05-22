import { createSlice } from '@reduxjs/toolkit'

// create a new slice
export const todoSlice = createSlice({

    // name of the slice
    name: 'todo',

    // initial state
    initialState: {
        nextId: 2,
        data: {
            1: {
                content: 'Content 1',
                completed: false
            }
        }
    },

    // define reducers to update the state
    reducers: {
        addTodo: (state, action) => {
            state.data[state.nextId] = {
                content: action.payload,
                completed: false
            }
            state.nextId++ //increment the nextId
        },

        deleteTodo: (state, action) => {
            delete state.data[action.payload]
        },

        editTodo: (state, action) => {
            const { id, input} = action.payload
            state.data[id].content = input //edit at an action according to the input
        },

        completedTodo: (state, action) => {
            const id = action.payload
            state.data[id].completed = !state.data[id].completed //allow toggle
        }
    }
})

// Extract the action creators from the slice
export const { addTodo, deleteTodo, editTodo, completedTodo } = todoSlice.actions

// export the reducer function
export default todoSlice.reducer
