import { useEffect, useState } from "react";

const CompletedTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/task')
        .then(res => res.json())
        .then(data => setTasks(data));
    }, [])

    return (
        <div>
            <h1>Completed Task {tasks.length}</h1>
        </div>
    );
};

export default CompletedTask;