import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const addTask = () => {
        if (!task.trim()) {
            setError('Task cannot be empty.');
            return;
        }
       // Validation: Check for duplicate task
       const taskExists = tasks.some(t => t.text.toLowerCase() === task.toLowerCase());
       if (taskExists) {
           setError('Task already exists.');
           return;
       }

       // If validation passes, add the task
       setTasks([...tasks, { text: task, completed: false }]);
       setTask(''); // Clear input field
       setError(''); // Clear any previous error
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = tasks.map((t, i) => 
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };
     // Calculate pending tasks (not completed)
     const pendingTasksCount = tasks.filter(task => !task.completed).length;
     // Calculate completed tasks
     const completedTasksCount = tasks.filter(task => task.completed).length;

    return (
        <div>
            <h1>To-Do List</h1>

            {/* Display Task Done / Total Tasks */}
            <p>Task Done: {completedTasksCount}/{tasks.length}</p>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>

            {/* Show validation error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {tasks.map((t, index) => (
                    <li key={index} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleTaskCompletion(index)}
                        />
                        {t.text}
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
