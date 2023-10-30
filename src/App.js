import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AssignTask from "./Pages/AssignTask";
import Blog from "./Pages/Blog";
import CompletedTask from "./Pages/CompletedTask";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Page404 from "./Pages/Page404";
import Register from "./Pages/Register";
import Reviewed from "./Pages/Reviewed";
import TaskDetail from "./Pages/TaskDetail";
import ToDo from "./Pages/ToDo";
import Users from "./Pages/Users";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/assign" element={<AssignTask />}></Route>
        <Route path="/toDo/taskDetail/:id" element={<TaskDetail />}></Route>
        <Route
          path="/conpletedTask"
          element={<CompletedTask></CompletedTask>}
        ></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route path="users" element={<Users />}></Route>
        </Route>
        {/* <Route path="/myTask/:id" element={<MyTask />}></Route> */}
        <Route path="/toDo" element={<ToDo></ToDo>}></Route>
        <Route path="/reviewed" element={<Reviewed />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<Page404></Page404>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
