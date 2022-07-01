import { useEffect, useState } from "react";

const CompletedTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/task')
        .then(res => res.json())
        .then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h1>Completed Task {tasks.length}</h1>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-1 lg:grid-cols-1">
                    {
                        tasks.map(task => <div className="flex justify-start items-center p-2" key={task._id}>
                        <input type="checkBox" className="mx-3" /> {task.title}
                        <div className="divider"></div> 
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;