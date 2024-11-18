import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        activeTask: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                timeSpent: 0,
                status: 'idle', // idle | active | paused | completed
            });
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
            state.tasks.forEach(task => {
                if (task.id === action.payload) task.status = 'active';
                else if (task.status === 'active') task.status = 'paused';
            });
        },
        incrementTimeSpent: (state) => {
            const task = state.tasks.find(task => task.id === state.activeTask);
            if (task) task.timeSpent += 1;
        },
        completeTask: (state) => {
            const task = state.tasks.find(task => task.id === state.activeTask);
            if (task) task.status = 'completed';
            state.activeTask = null;
        },
        editTask: (state, action) => {
            const { id, newTitle } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) task.title = newTitle;
        },
    },
});

export const { addTask, setActiveTask, incrementTimeSpent, completeTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
