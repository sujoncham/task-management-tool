import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/users");
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };
  //   getData();
  // }, []);

  // console.log(tasks);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/api/task")
        .then((data) => {
          // console.log(data.data);
          setTasks(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

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
    <div className="container mx-auto px-10 py-10">
      <div className="mt-10 border-2 border-purple-400 rounded-lg p-3">
        <h1 className="text-center text-3xl font-bold mt-5 mb-10">
          To-Do Task - {tasks?.length}
        </h1>
        <div className="mb-5 overflow-y-auto min-h-[500px]">
          <ol className="flex flex-col gap-1">
            {tasks?.data?.map(
              (task) =>
                task.review === "" && (
                  <li
                    className={`${
                      task.review === "assign"
                        ? "hidden"
                        : "flex justify-between items-center shadow-3xl bg-base-200 px-3 py-2 rounded-md"
                    }`}
                    key={task._id}
                  >
                    <div className="w-[60%]">
                      <p>{task.title}</p>
                    </div>
                    <div className="w-[30%] flex items-center">
                      <Link
                        to={`/toDo/taskDetail/${task._id}`}
                        className="hover:text-purple-600 btn btn-sm"
                      >
                        detail
                      </Link>
                    </div>
                    <div className="w-[10%]">
                      <label
                        onClick={() => deleteTask(task._id)}
                        htmlFor="my-task"
                        className="hover:text-purple-600 btn btn-sm"
                      >
                        <FaTrashAlt size={10} />
                      </label>
                    </div>
                  </li>
                )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
