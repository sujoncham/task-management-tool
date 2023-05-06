import InputForm from "./InputForm";

const Home = () => {
    const myfunction = (mynumber)=>{
        if(typeof mynumber === "string"){
            const value = parseFloat(mynumber)*1000;
            return `This converted result is ${value}`
        } else if(typeof mynumber === 'number'){
            const value = mynumber*1000;
            return value;
        } else{
            const value = "not get value";
            return value;
        }
    }
    const getData = myfunction()
    console.log(getData);


    return (
        <div className="container mx-auto py-10">
            <InputForm />
        </div>
    );
};

export default Home;