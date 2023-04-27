const MyTask = ({ edits, setEdits, refetch }) => {
  const { _id, title, date } = edits;

  const updateTask = (event) => {
    event.preventDefault();
    const updateTitle = {
      title: event.target.title.value,
      date : event.target.date.value,
    };

    fetch(`http://localhost:5000/task/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateTitle),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("data added successfully");
        }
        refetch();
      });
    setEdits(null);
  };

  const handleTitle = (event) => {
    const { title, ...rest } = edits;
    const newTitle = event.target.value;
    const newData = { title: newTitle, ...rest };
    setEdits(newData);
  };
  const handleDate = (event) => {
    const { date, ...rest } = edits;
    const newDate = event.target.value;
    const newData = { date: newDate, ...rest };
    setEdits(newData);
  };

  return (
    <div>
      <input type="checkbox" id="my-task" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-task"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={updateTask}>
            <input
              type="text"
              name="title"
              onChange={handleTitle}
              value={title || ""}
              className="input input-bordered"
            />
            <input type="date" name="date"
             className="input input-bordered" 
             onChange={handleDate}
             value={date || ""}
             />
            <div className="mt-10">
              <button type="submit" className="btn btn-sm">update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
