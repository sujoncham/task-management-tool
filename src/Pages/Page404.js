import img from "../assets/not-found.png";
const Page404 = () => {
  return (
    <div className="container mx-auto px-10 py-16 flex justify-center items-center">
      <img src={img} className="w-[850px]" alt="not found" />
    </div>
  );
};

export default Page404;
