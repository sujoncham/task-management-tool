import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import MyTask from "./MyTask";

const ToDo = () => {
  const [edits, setEdits] = useState(null);
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/api/task")
        .then((data) => {
          console.log(data.data);
          setTasks(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const handleCompleted = (id) => {
    fetch(`http://localhost:5000/api/task/completed/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Completed task successfully");
      });
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete completed task!!!"
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/api/task/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast("Completed task deleted");
        });
    }
  };

  return (
    <div className="mt-10 border-2 border-purple-400 rounded-lg p-3">
      <h1 className="text-center text-3xl font-bold mt-5 mb-10">
        To-Do Task - {tasks?.length}
      </h1>
      <div className="grid grid-cols-1 gap-1 mb-5 overflow-y-auto h-[500px]">
        {tasks?.data?.map((task) => (
          <div
            className={`${
              task.status === "completed"
                ? "hidden"
                : "flex justify-between items-center shadow-3xl bg-base-200 px-3 py-2 rounded-md"
            }`}
            key={task._id}
            task={task}
          >
            <div
              className={`${
                task.status === "completed"
                  ? "hidden"
                  : "flex justify-between items-center shadow-3xl bg-base-200 py-1 rounded-md"
              }`}
            >
              <input
                onClick={() => handleCompleted(task._id)}
                type="checkbox"
                className="mx-2 cursor-pointer"
              />
              <span className="flex flex-col">
                <span>{task.title}</span>
                <span>
                  {new Date(task.startDate).toISOString().slice(0, 10) || ""}
                </span>
              </span>
            </div>
            <div
              className={`${
                task.status === "completed"
                  ? "hidden"
                  : "flex justify-between items-center shadow-3xl bg-base-200 px-3 py-2 rounded-md"
              }`}
            >
              <label
                onClick={() => setEdits(task)}
                htmlFor="my-task"
                className="hover:text-purple-600 btn btn-sm"
              >
                <FaPen size={10} />
              </label>
              <label
                onClick={() => deleteTask(task._id)}
                htmlFor="my-task"
                className="hover:text-purple-600 btn btn-sm"
              >
                <FaTrashAlt size={10} />
              </label>
            </div>
          </div>
        ))}
      </div>
      {edits && <MyTask setEdits={setEdits} edits={edits}></MyTask>}
    </div>
  );
};

export default ToDo;
