import React from "react";

const ReviewModal = ({ review, refetch, setReview, handleReviewed }) => {
  const handleRejected = (id) => {
    fetch(`http://localhost:5000/api/task/completed/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ review: "Qc Done" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        setReview(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="checkbox" id="my-review" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-review"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h1 className="mb-5 font-bold">{review.title}</h1>
            <p>{review.note}</p>
            <div className="mt-10 flex justify-around items-center">
              <button
                htmlFor="my-review"
                onClick={() => handleRejected(review._id)}
                className="border-2 border-purple-400 rounded-md p-1"
              >
                rejected
              </button>
              <button
                onClick={() => handleReviewed(review._id)}
                className="border-2 border-purple-400 rounded-lg p-1 text-[10px]"
              >
                Qc Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
