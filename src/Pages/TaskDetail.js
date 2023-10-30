import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  // console.log(task);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:5000/api/task/${id}`)
        .then((data) => {
          // console.log(data.data);
          setTask(data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [id]);

  const handleAssigned = async (id) => {
    const url = `http://localhost:5000/api/task/assign/${id}`;
    const data = { review: "assign" };

    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      toast("Completed task successfully"); // Assuming toast is defined somewhere
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <h1>Task Details {id}</h1>
      <div>
        <h2>{task.title}</h2>

        <button
          onClick={() => handleAssigned(task._id)}
          className="border-2 border-purple-400 rounded-lg px-2 py-1"
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
