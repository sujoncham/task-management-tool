import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import ReviewModal from "./ReviewModal";

const CompletedTask = () => {
  const [review, setReview] = useState(null);
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("completed", () =>
    fetch("http://localhost:5000/api/task/completed").then((res) => res.json())
  );

  if (isLoading) {
    return <p>Looding......</p>;
  }

  const handleReviewed = (id) => {
    const url = `http://localhost:5000/api/task/reviewed/${id}`;
    const data = { review: "completed" };

    axios
      .put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        refetch(); // Assuming refetch is defined somewhere
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="mt-10 border-2 border-purple-400 rounded-lg px-5 py-1">
        <h1 className="text-3xl font-bold text-center mb-14">
          Reviewing and Pending Task
        </h1>

        <div className="grid grid-cols-1 gap-1 mb-5">
          {tasks?.data?.map((task, index) =>
            task.review === "submitted" ? (
              <div
                index={index}
                className={`${
                  task.review === "completed"
                    ? "hidden"
                    : "flex justify-between items-center shadow-3xl bg-base-200 px-3 py-2 rounded-md"
                }`}
                key={task._id}
              >
                <div>
                  <span>({index + 1})</span>. <span>{task.title}</span>
                </div>
                <div>
                  <label
                    onClick={() => setReview(task)}
                    htmlFor="my-review"
                    className="border-2 border-purple-400 rounded-lg p-1 text-[10px]"
                  >
                    review
                  </label>
                </div>
              </div>
            ) : (
              <p>no review pending</p>
            )
          )}
        </div>
        {review && (
          <ReviewModal
            review={review}
            setReview={setReview}
            refetch={refetch}
            handleReviewed={handleReviewed}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedTask;
