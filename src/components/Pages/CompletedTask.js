import { useState } from 'react';
import { useQuery } from 'react-query';
import ReviewModal from './ReviewModal';

const CompletedTask = () => {
    const [review, setReview] = useState(null);
    const {data:tasks, isLoading, refetch} = useQuery('completed', () => fetch('http://localhost:5000/api/task/completed')
    .then(res => res.json()));

    if(isLoading){
        return <p>Looding......</p>;
    }

    const handleReviwed =(id)=>{
        fetch(`http://localhost:5000/api/task/reviewed/${id}`, {
            method: 'PUT',
            headers:{
                'content-type' : 'application/json',
            },
            body:JSON.stringify({ review: 'completed' })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            refetch();
        })
    }

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-3xl font-bold text-center mb-14'>Completed Task - {tasks?.length} (pending review)</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-3 mb-5">
                {
                    tasks?.data?.map((task, index) => <div index={index} className={`${task.review === 'completed' ? 'hidden': 'flex justify-between items-center shadow-3xl bg-base-200 px-4 py-4 rounded-md'}`} key={task._id}>
                    <div>
                    <span>({index + 1})</span>. <span>{task.title}</span> 
                    </div>
                    <div>
                    <label onClick={()=>setReview(task)} htmlFor="my-review" 
                        className='border-2 border-purple-400 rounded-lg p-1 text-[10px]'>
                        review
                    </label>
                    <button onClick={() => handleReviwed(task._id)} 
                        className='border-2 border-purple-400 rounded-lg p-1 text-[10px]'>
                        Qc pending
                    </button>
                    </div>
                </div>)
                }
            </div>
           {review && <ReviewModal review={review} setReview={setReview} refetch={refetch} />}
        </div>
    );
};

export default CompletedTask;