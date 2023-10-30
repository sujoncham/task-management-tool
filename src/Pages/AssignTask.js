import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import MyTask from "./MyTask";

const AssignTask = () => {
  const [edits, setEdits] = useState(null);
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("assign", () =>
    fetch("http://localhost:5000/api/task/assign").then((res) => res.json())
  );

  if (isLoading) {
    return <p>Looding......</p>;
  }

  const handleSubmitted = async (id) => {
    const url = `http://localhost:5000/api/task/submitted/${id}`;
    const data = { review: "submitted" };

    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      refetch(); // Assuming refetch is defined somewhere
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="mt-10 border-2 border-purple-400 rounded-lg p-3">
        <div>
          <h1 className="text-3xl font-bold text-center mb-5">My Task</h1>
        </div>
        <div className="mt-10 border-[.50px] border-gray-400 rounded-lg p-3">
          <div className="mb-5">
            {tasks?.data?.map((task, index) =>
              task?.review === "assign" ? (
                <div
                  index={index}
                  className={`${
                    task.review === "submitted"
                      ? "hidden"
                      : "flex justify-between items-center shadow-3xl bg-base-200 px-3 py-2 mb-2 rounded-md"
                  }`}
                  key={task._id}
                >
                  <div>
                    <span>({index + 1})</span>. <span>{task.title}</span>
                  </div>
                  <div className="">
                    <label
                      onClick={() => setEdits(task)}
                      htmlFor="my-task"
                      className="border-2 border-purple-400 rounded-lg p-1 text-[12px] mr-2"
                    >
                      Task Edit
                    </label>
                    <button
                      onClick={() => handleSubmitted(task._id)}
                      className="border-2 border-purple-400 rounded-lg p-1 text-[12px]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <p>no review pending</p>
              )
            )}
          </div>
        </div>
      </div>
      {edits && (
        <MyTask
          setEdits={setEdits}
          edits={edits}
          handleSubmitted={handleSubmitted}
        ></MyTask>
      )}
    </div>
  );
};

export default AssignTask;
