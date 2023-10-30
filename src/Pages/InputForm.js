import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";

const InputForm = () => {
  const { user } = useAuthState(auth);
  console.log(user);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = event.target.task.value;
    const taskSend = {
      title,
    };
    fetch("http://localhost:5000/api/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("inserted data", data);
        toast("Task Create successfully");
        event.target.reset();
      });
  };
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="border-2 border-purple-500 px-5 py-5 rounded-md">
        <h1 className="text-3xl font-bold mb-10">Add Task</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="task"
            placeholder="add task here"
            className="input input-bordered w-full max-w-xs mb-5"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-btn">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
