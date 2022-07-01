import { useState } from "react";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from "react-query";
import { toast } from 'react-toastify';
import MyTask from "./MyTask";

const ToDo = () => {
    const [edits, setEdits] = useState(null);

    const { data:tasks, isLoading, refetch } = useQuery('task', () => fetch(`https://conservative-donair-22687.herokuapp.com/task`)
      .then((res) => res.json()))

      if(isLoading){
        return <p>Looding......</p>;
    }

    const handleCompleted = (id) =>{
        fetch(`https://conservative-donair-22687.herokuapp.com/task/completed/${id}`, {
            method: 'PUT',
            headers:{
                'content-type' : 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            refetch();
        })
    }

    const deleteTask = (id) =>{
        const confirmDelete = window.confirm('Are you sure to delete completed task!!!');
        if(confirmDelete){
            fetch(`https://conservative-donair-22687.herokuapp.com/task/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type' : 'application/json',
            },
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount){
                    toast('Completed task deleted');
                    refetch();
                }
            })
        }
    }

    return (
        <div className="mt-5">
            <h1 className="text-center text-3xl font-bold mb-5">To-Do Task - {tasks.length}</h1>
            <div className="flex justify-center">
                <div className="w-96 shadow-3xl bg-base-200 rounded p-3 mb-5">
                    {
                        tasks?.map(task => <div className="flex justify-between items-center p-2" key={task._id} task={task}>
                            <div>
                            <input onClick={() => handleCompleted(task._id)} disabled={task.role === 'completed'} type="checkbox" className="mx-3" /> 
                            <span className={`${task.role === 'completed' ? 'line-through': ''}`} >{task.title}</span> 
                            </div>
                            <div>
                                <label onClick={()=>setEdits(task)} htmlFor="my-task" disabled={task.role === 'completed'} className="btn btn-sm"><FaPen /></label> 
                                <label onClick={()=>deleteTask(task._id)} htmlFor="my-task" disabled={task.role !== 'completed'} className="btn btn-sm"><FaTrashAlt /></label>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            { edits && <MyTask setEdits={setEdits} edits={edits} refetch={refetch}></MyTask> }
        </div>
    );
};

export default ToDo;