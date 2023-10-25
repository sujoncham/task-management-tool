import CompletedTask from "./CompletedTask";
import InputForm from "./InputForm";
import Reviewed from "./Reviewed";
import ToDo from "./ToDo";

const Home = () => {
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="mb-5">
        <InputForm />
        <ToDo />
        <CompletedTask />
        <Reviewed />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3"></div>
    </div>
  );
};

export default Home;
