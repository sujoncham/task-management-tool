import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../Firebase/Firebase.init';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLoginForm = () =>{
        navigate('/login');
    }

    const logout = () => {
        signOut(auth);
      };


    const myNavbar = (<>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/toDo'>ToDo</Link></li>
        <li><Link to='/conpletedTask'>Completed Tasks</Link></li>
        <li><Link to='/calendar'>Calendar</Link></li>
    </>);

    return (
        <div className="navbar bg-slate-300 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {myNavbar}
                </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-3xl">Task Tool</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                {myNavbar}
                </ul>
            </div>
            <div className="navbar-end">
            { user ? 
            <button onClick={logout} class="btn btn-primary">Logout</button>
            :
             <button onClick={handleLoginForm} class="btn btn-primary">Login</button>
             }
            </div>
        </div>
    );
};

export default Navbar;