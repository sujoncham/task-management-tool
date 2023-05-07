const MyTask = ({ edits, setEdits, refetch }) => {
  const { _id, title, date, startDate, note } = edits;

  const newdate = new Date(startDate);
const formattedDate = newdate.toISOString().slice(0, 10); // "2023-05-07"

  const updateTask = (event) => {
    event.preventDefault();
    const updateTitle = {
      title: event.target.title.value,
      note: event.target.note.value,
      date : event.target.date.value,
      startDate : event.target.startDate.value,
    };

    fetch(`http://localhost:5000/api/task/${_id}`, {
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
  const handleStartDate = (event) => {
    const { startDate, ...rest } = edits;
    const newDate = event.target.value;
    const newData = { startDate: newDate, ...rest };
    setEdits(newData);
  };
  const handleNote = (event) => {
    const { note, ...rest } = edits;
    const newDate = event.target.value;
    const newData = { note: newDate, ...rest };
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
          <form onSubmit={updateTask} className="flex flex-col mt-5">
            <input
              type="text"
              name="title"
              onChange={handleTitle}
              value={title || ""}
              className="input input-bordered mb-5"
            />
           <div className="flex justify-between items-center mb-5">
           <div>
            <label htmlFor="startdate">Starting Date : {formattedDate}</label>
           <input type="date" name="startDate"
             className="input input-bordered" 
             onChange={handleStartDate}
             value={formattedDate || startDate || ""}
             />
           </div>
             
            <div>
            <label htmlFor="date">End Date</label>
            <input type="date" name="date"
             className="input input-bordered" 
             onChange={handleDate}
             value={date || ""}
             />
            </div>
           </div>
             
             <textarea type="text" name="note" cols="30" rows="10"
             className="border-2 border-purple-500" 
             onChange={handleNote}
             value={note || ""}
             ></textarea>
            
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
