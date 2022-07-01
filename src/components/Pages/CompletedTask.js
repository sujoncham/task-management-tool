import { useQuery } from 'react-query';

const CompletedTask = () => {
    const {data:tasks, isLoading} = useQuery('completed', () => fetch('https://conservative-donair-22687.herokuapp.com/completed').then(res => res.json()));

    if(isLoading){
        return <p>Looding......</p>;
    }

    return (
        <div className='mt-10 min-h-screen'>
            <h1 className='text-3xl font-bold text-center mb-14'>Completed Task - {tasks.length}</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-1">
                    {
                        tasks?.map((task, index) => <div index={index} className="flex justify-start items-center p-2" key={task._id}>
                        <span>({index + 1})</span>. {task.title}
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;