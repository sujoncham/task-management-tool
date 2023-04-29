import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/AuthenticateLogin/Login';
import Register from './components/AuthenticateLogin/Register';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CompletedTask from './components/Pages/CompletedTask';
import Home from './components/Pages/Home';
import Page404 from './components/Pages/Page404';
import Reviewed from './components/Pages/Reviewed';
import ToDo from './components/Pages/ToDo';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/conpletedTask' element={<CompletedTask></CompletedTask>}></Route>
        <Route path='/toDo' element={<ToDo></ToDo>}></Route>
        <Route path='/reviewed' element={<Reviewed />}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='*' element={<Page404></Page404>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
