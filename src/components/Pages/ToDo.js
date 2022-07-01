import { FaPen } from "react-icons/fa";
import { useQuery } from 'react-query';

const ToDo = () => {
    
    const {data:tasks, isLoading} = useQuery('tasks', ()=> fetch('http://localhost:5000/task').then(res=>res.json()));

    if(isLoading){
        return <p>Looding......</p>;
    }

    const editTask = () =>{
        console.log('edit task')
    }


    return (
        <div>
            <h1>To Do App</h1>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-1 lg:grid-cols-1">
                    {
                        tasks.map(task => <div className="flex justify-start items-center p-2" key={task._id}>
                        <input type="checkBox" className="mx-3" /> {task.title} <span onClick={editTask} className="m-3 cursor-pointer"><FaPen /></span>
                        <div className="divider"></div> 
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ToDo;