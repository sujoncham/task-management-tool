import { useState } from "react";
import { FaPen } from 'react-icons/fa';
import { useQuery } from "react-query";
import MyTask from "./MyTask";

const ToDo = () => {
    const [edits, setEdits] = useState(null);

    const { data:tasks, isLoading, refetch } = useQuery('available', () => fetch(`http://localhost:5000/task`)
      .then((res) => res.json()))

      if(isLoading){
        return <p>Looding......</p>;
    }

    const handleCompleted = (id) =>{
        fetch(`http://localhost:5000/task/completed/${id}`, {
            method: 'PUT',
            headers:{
                'content-type' : 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.success);
            refetch();
        })
    }

    return (
        <div className="mt-14">
            <h1 className="text-center text-3xl font-bold">To-Do Task - {tasks.length}</h1>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-1 lg:grid-cols-1 shadow-3xl bg-base-200 rounded">
                    {
                        tasks?.map(task => <div className="flex justify-start items-center p-2" key={task._id} task={task}>
                        <input onClick={() => handleCompleted(task._id)} type="checkBox" className="mx-3" /> {task.title} <label onClick={()=>setEdits(task)} htmlFor="my-task" className="btn btn-link"><FaPen /></label>
                            </div>)
                    }
                </div>
            </div>
            { edits && <MyTask setEdits={setEdits} edits={edits} refetch={refetch}></MyTask> }
        </div>
    );
};

export default ToDo;