import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setActiveTask, incrementTimeSpent, completeTask, editTask } from '../../store/tasksSlice';

const TasksPage = () => {
    const dispatch = useDispatch();
    const { tasks, activeTask } = useSelector(state => state.tasksReducer);

    const [taskTitle, setTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim()) {
            dispatch(addTask(taskTitle));
            setTaskTitle('');
        }
    };

    const handleEditTask = (taskId, newTitle) => {
        dispatch(editTask({ id: taskId, newTitle }));
        setEditTaskId(null);
        setEditTaskTitle('');
    };

    useEffect(() => {
        let interval;
        if (activeTask) {
            interval = setInterval(() => dispatch(incrementTimeSpent()), 1000);
        }
        return () => clearInterval(interval);
    }, [activeTask, dispatch]);

    return (
        <div className="tasksContainer">
            <h1>Task Manager with Timer</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter task name"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="task-list">
                <h2>Task List</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div>
                                {editTaskId === task.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editTaskTitle}
                                            onChange={(e) => setEditTaskTitle(e.target.value)}
                                        />
                                        <button onClick={() => handleEditTask(task.id, editTaskTitle)}>Save</button>
                                    </div>
                                ) : (
                                    <strong>{task.title}</strong>
                                )}
                                <span>Time Spent: {task.timeSpent}s</span>
                                <span>Status: {task.status}</span>
                            </div>
                            <button onClick={() => dispatch(setActiveTask(task.id))}>
                                {activeTask === task.id ? 'Active' : 'Start'}
                            </button>
                            <button onClick={() => setEditTaskId(task.id) || setEditTaskTitle(task.title)}>
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {activeTask && (
                <div className="active-task">
                    <h2>Active Task</h2>
                    <div>
                        <p>Task: {tasks.find(task => task.id === activeTask)?.title}</p>
                        <p>Time: {tasks.find(task => task.id === activeTask)?.timeSpent} seconds</p>
                        <button onClick={() => dispatch(completeTask())}>Pause</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage;
