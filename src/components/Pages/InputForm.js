
const InputForm = () => {

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        const title = event.target.task.value;
        const taskSend = {
            title,
        };
        fetch('https://conservative-donair-22687.herokuapp.com/task', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json',
            },
            body: JSON.stringify(taskSend),
        })
        .then(res => res.json())
        .then(data => {
            console.log('inserted data', data);
            event.target.reset();
        });
    }
    return (
        <div className="mt-10 min-h-screen flex justify-center mb-5">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-2">
                <h1 className="text-3xl font-bold mb-10">Add Task</h1>
                <form onSubmit={handleFormSubmit}>
                <input type="text" name="task" placeholder="Type here" className="input input-bordered w-full max-w-xs" autoComplete="off" />
                {/* <button type="submit" className="btn btn-btn">submit</button> */}
                </form>
            </div>
        </div>
    );
};

export default InputForm;