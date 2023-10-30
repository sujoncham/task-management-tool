import { useQuery } from "react-query";

const Reviewed = () => {
  const { data: reviews, isLoading } = useQuery("reviews", () =>
    fetch("http://localhost:5000/api/task/reviewed").then((res) => res.json())
  );

  if (isLoading) {
    return <p>Looding......</p>;
  }

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="mt-10 border-2 border-purple-400 rounded-lg px-2 py-2">
        <h1 className="text-3xl font-bold text-center mt-10 mb-14">Qc Done</h1>

        <div className="grid grid-cols-1 gap-1 mb-5">
          {reviews?.data?.map((task, index) => (
            <div
              index={index}
              className="shadow-3xl bg-base-200 px-5 py-2 rounded-md flex justify-between items-center"
              key={task._id}
            >
              <div>
                <span>({index + 1})</span>. <span>{task.title}</span>
              </div>
              <span className="border-2 border-purple-400 bg-green-500 rounded-lg p-1">
                Qc Done
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviewed;
