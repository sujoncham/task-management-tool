import { FaDumbbell, FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <div className="items-center grid-flow-col">
                <FaDumbbell size={50} /> 
                <p>Copyright © 2022 - All right reserved <br /> by Sujon Chambugong</p>
            </div> 
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link to='/'><FaFacebookSquare size={40} /></Link>
                <Link to='/'><FaYoutube size={40} /></Link>
                <Link to='/'><FaTwitter size={40} /></Link>
             
            </div>
            </footer>
    );
};

export default Footer;