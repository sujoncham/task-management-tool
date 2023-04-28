import { useState } from "react";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from "react-query";
import { toast } from 'react-toastify';
import MyTask from "./MyTask";

const ToDo = () => {
    const [edits, setEdits] = useState(null);

    const { data:tasks, isLoading, refetch } = useQuery('task', () => fetch(`http://localhost:5000/task`)
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
            refetch();
        })
    }

    const deleteTask = (id) =>{
        const confirmDelete = window.confirm('Are you sure to delete completed task!!!');
        if(confirmDelete){
            fetch(`http://localhost:5000/task/${id}`, {
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
        <div className="container mx-auto px-10 mt-5">
            <h1 className="text-center text-3xl font-bold mb-5">To-Do Task - {tasks?.length}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-3 mb-5">
                    {
                        tasks?.map(task => <div className="flex justify-between items-center shadow-3xl bg-base-200 py-4 rounded-md" key={task._id} task={task}>
                            <div className="flex gap-2">
                            <input onClick={() => handleCompleted(task._id)} disabled={task.role === 'completed'} type="checkbox" className="mx-2" /> 
                            <span className="flex flex-col">
                                <span className={`${task.role === 'completed' ? 'line-through': ''}`} >{task.title}</span> 
                                <span className={`text-[10px] ${task.role === 'completed' ? 'line-through': ''}`} >{task.startDate || ""}</span> 
                            </span>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <label onClick={()=>setEdits(task)} htmlFor="my-task" disabled={task.role === 'completed'} className="cursor-pointer hover:text-purple-600 btn btn-sm"><FaPen size={10} /></label> 
                                <label onClick={()=>deleteTask(task._id)} htmlFor="my-task" disabled={task.role !== 'completed'} className="cursor-pointer hover:text-purple-600 btn btn-sm"><FaTrashAlt size={10} /></label>
                            </div>
                        </div>)
                    }
                </div>
            { edits && <MyTask setEdits={setEdits} edits={edits} refetch={refetch}></MyTask> }
        </div>
    );
};

export default ToDo;