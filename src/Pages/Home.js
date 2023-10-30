import AssignTask from "./AssignTask";
import CompletedTask from "./CompletedTask";
import InputForm from "./InputForm";
import Reviewed from "./Reviewed";
import ToDo from "./ToDo";

const Home = () => {
  return (
    <>
      <div className="mb-5">
        <InputForm />
        <ToDo />
        <AssignTask />
        <CompletedTask />
        <Reviewed />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3"></div>
    </>
  );
};

export default Home;
