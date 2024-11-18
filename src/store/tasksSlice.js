import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    activeTask: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                title: action.payload,
                timeSpent: 0,
                status: 'active',
            };
            state.tasks.push(newTask);
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
        },
        incrementTimeSpent: (state) => {
            const activeTask = state.tasks.find(task => task.id === state.activeTask);
            if (activeTask && activeTask.status === 'active') {
                activeTask.timeSpent += 1;
            }
        },
        completeTask: (state) => {
            const activeTask = state.tasks.find(task => task.id === state.activeTask);
            if (activeTask) {
                activeTask.status = 'completed';
                state.activeTask = null;
            }
        },
        pauseTask: (state) => {
            const activeTask = state.tasks.find(task => task.id === state.activeTask);
            if (activeTask) {
                activeTask.status = 'paused';
                state.activeTask = null;
            }
        },
        resumeTask: (state, action) => {
            const activeTask = state.tasks.find(task => task.id === action.payload);
            if (activeTask) {
                activeTask.status = 'active';
                state.activeTask = action.payload;
            }
        },
        editTask: (state, action) => {
            const { id, newTitle } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = newTitle;
            }
        },
    },
});

export const { 
    addTask, 
    setActiveTask, 
    incrementTimeSpent, 
    completeTask, 
    pauseTask, 
    resumeTask, 
    editTask 
} = tasksSlice.actions;

export default tasksSlice.reducer;
