import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';
import { RiProgress7Line } from 'react-icons/ri';
import './styles/todo.css'; 

// eslint-disable-next-line react/prop-types

export default function ToDo({ selectedDate }) {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [toastMessage, setToastMessage] = useState(''); // State for the toast message

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setList(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Function to show the toast message
  function showToast(message) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000); // Toast disappears after 3 seconds
  }

  function addTask() {
    if (task.trim()) {
      const newTask = {
        text: task,
        completed: false,
        date: selectedDate.toDateString(),
      };
      axios.post('http://localhost:5000/tasks', newTask)
        .then(response => {
          setList([...list, response.data]);
          setTask('');
          showToast('Task added successfully!'); // Custom toast
        })
        .catch(error => {
          console.error('Error adding task:', error);
          showToast('Failed to add task!'); // Custom toast
        });
    }
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setList(list.filter(item => item._id !== id));
        showToast('Task deleted successfully!'); // Custom toast
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        showToast('Failed to delete task!'); // Custom toast
      });
  }

  function startEditTask(id) {
    setIsEditing(true);
    const taskToEdit = list.find(item => item._id === id);
    setEditText(taskToEdit.text);
    setEditIndex(list.findIndex(item => item._id === id));
  }

  function saveEditTask() {
    const updatedTask = {
      text: editText,
      completed: list[editIndex].completed,
    };
    axios.put(`http://localhost:5000/tasks/${list[editIndex]._id}`, updatedTask)
      .then(response => {
        setList(list.map(item =>
          item._id === list[editIndex]._id ? response.data : item
        ));
        setIsEditing(false);
        setEditIndex(null);
        setEditText('');
        showToast('Task updated successfully!'); // Custom toast
      })
      .catch(error => {
        console.error('Error updating task:', error);
        showToast('Failed to update task!'); // Custom toast
      });
  }

  function toggleCompleted(id) {
    const task = list.find(item => item._id === id);
    const updatedTask = { ...task, completed: !task.completed };
    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(response => {
        setList(list.map(item => item._id === id ? response.data : item));
      })
      .catch(error => console.error('Error toggling task:', error));
  }

  const filteredTasks = list
    .filter(item => item.date === selectedDate.toDateString())
    .sort((a, b) => a.completed - b.completed);

  function handleKey(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        saveEditTask();
      } else if (task.trim()) {
        addTask();
      }
    }
  }

  return (
    <div className="todo-container">
      {toastMessage && <div className="toast">{toastMessage}</div>}

      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter the task"
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <h2 className="task-heading">
        Tasks for {selectedDate.toDateString()}
      </h2>

      <ol className="task-list">
        {filteredTasks.map((item) => (
          <div className="task-item" key={item._id}>
            {isEditing && editIndex === list.findIndex(task => task._id === item._id) ? (
              <input
                type="text"
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKey}
              />
            ) : (
              <li className={`task-text ${item.completed ? 'completed' : ''}`}>
                {item.text}
              </li>
            )}

            {isEditing && editIndex === list.findIndex(task => task._id === item._id) ? (
              <button className="save-button" onClick={saveEditTask}>
                <TfiSave />
              </button>
            ) : (
              <button className="edit-button" onClick={() => startEditTask(item._id)}>
                <FaEdit />
              </button>
            )}
            <button className="delete-button" onClick={() => deleteTask(item._id)}>
              <MdDeleteOutline />
            </button>
            <button
              className={`toggle-button ${item.completed ? 'completed-task' : 'pending-task'}`}
              onClick={() => toggleCompleted(item._id)}
            >
              {item.completed ? <FaCheckCircle /> : <RiProgress7Line />}
            </button>
          </div>
        ))}
      </ol>
    </div>
  );
}
