'use client'
import React, { useEffect, useState } from 'react'
import useGenerateID from '../hooks/useGenerateID';
import styles from "./TodoList.module.css";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const tasks = localStorage.getItem("tasks");

        if (tasks) {
            setTaskList(JSON.parse(tasks));
        }
    }, [])
    
    const validate = () => {
        if (!task) {
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            alert("Campo tarefa precisa ser preenchido!");
            return;
        }

        const id = useGenerateID(taskList);

        const newTask = {
            id,
            task
        }

        const updateTask = [... taskList, newTask];

        setTaskList(updateTask);

        localStorage.setItem("tasks", JSON.stringify(updateTask));

        setTask("");

    }

    const handleDelete = (id) => {
        const updateTask = taskList.filter(value => value.id !== id);

        localStorage.setItem("tasks", JSON.stringify(updateTask));

        setTaskList(updateTask);
    }

    const reset = () => {
        setTaskList([]);
        localStorage.removeItem("tasks");
    }


  return (
    <div className={styles.div}>
        <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={e => setTask(e.target.value)} className={styles.input} />
        <button type="submit" className={styles.btn_submit}>Enviar</button>
        </form>
        <ul>
        {taskList.length > 0 && taskList.map(value => (
            <div className={styles.list_container}>
            <li key={value.id}>
                {value.task}
            </li>
            <button onClick={() => handleDelete(value.id)} className={styles.btn_remove}>Remover</button>
            </div>
        ))}
        <button onClick={reset} className={styles.btn_reset}>Resetar</button>
        </ul>
    </div>
  )
}

export default TodoList