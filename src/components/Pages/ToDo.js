import { useState } from "react";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from "react-query";
import { toast } from 'react-toastify';
import MyTask from "./MyTask";

const ToDo = () => {
    const [edits, setEdits] = useState(null);

    const { data:tasks, isLoading, refetch } = useQuery('task', () => fetch(`http://localhost:5000/api/task`)
      .then((res) => res.json()))
      console.log(tasks)

      if(isLoading){
        return <p>Looding......</p>;
    }

    const handleCompleted = (id) =>{
        fetch(`http://localhost:5000/api/task/completed/${id}`, {
            method: 'PUT',
            headers:{
                'content-type' : 'application/json',
            },
            body:JSON.stringify({ status: 'completed' })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toast('Completed task successfully');
            refetch();
        })
    }

    const deleteTask = (id) =>{
        const confirmDelete = window.confirm('Are you sure to delete completed task!!!');
        if(confirmDelete){
            fetch(`http://localhost:5000/api/task/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type' : 'application/json',
            },
            })
            .then(res => res.json())
            .then(data => {
               
                toast('Completed task deleted');
                refetch();
                
            })
        }
    }

    return (
        <div className="container mx-auto px-10 mt-5 py-10">
            <h1 className="text-center text-3xl font-bold mb-5">To-Do Task - {tasks?.length}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-3 mb-5">
                    {
                        tasks?.data?.map(task => <div className={`${task.status === 'completed' ? 'hidden': 'flex justify-between items-center shadow-3xl bg-base-200 py-4 rounded-md'}`} key={task._id} task={task}>
                            <div className={`${task.status === 'completed' ? 'hidden': 'flex justify-between items-center shadow-3xl bg-base-200 py-4 rounded-md'}`}>
                            <input onClick={() => handleCompleted(task._id)} type="checkbox" className="mx-2 cursor-pointer" /> 
                            <span className="flex flex-col">
                                <span>{task.title}</span> 
                                <span>{new Date(task.date).toISOString().slice(0, 10) || ""}</span> 
                               
                            </span>
                            </div>
                            <div className={`${task.status === 'completed' ? 'hidden': 'flex justify-between items-center shadow-3xl bg-base-200 py-4 rounded-md'}`}>
                                <label onClick={()=>setEdits(task)} htmlFor="my-task" className="hover:text-purple-600 btn btn-sm"><FaPen size={10} /></label> 
                                <label onClick={()=>deleteTask(task._id)} htmlFor="my-task" className="hover:text-purple-600 btn btn-sm"><FaTrashAlt size={10} /></label>
                            </div>
                        </div>)
                    }
                </div>
            { edits && <MyTask setEdits={setEdits} edits={edits} refetch={refetch}></MyTask> }
        </div>
    );
};

export default ToDo;