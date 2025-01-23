import { useState } from "react";
import logo from "../images/LOGO1.png";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import '../style.css';
const NavBar = () => {
    const [nav, setNav] = useState(false);

    const changeBackground = () => {
        setNav(window.scrollY >= 50);
    };
    window.addEventListener('scroll', changeBackground);

    return (
        <nav className={nav ? "nav active" : "nav"}>
            <ScrollLink to="main" className='logo' smooth={true} duration={2000}>
                <img src={logo} alt='image here' />
            </ScrollLink>
            <input className="menu-btn" type='checkbox' id="menu-btn" />
            <label className="menu-icon" htmlFor='menu-btn'>
                <span className="nav-icon" />
            </label>
            <ul className="menu">
                <li><Link to='/login'>Login</Link></li>
                {/* <li><Link to='/admin-login'>Admin</Link></li>
                <li><Link to='/nutritionist-login'>Nutritionist</Link></li> */}

                <li><ScrollLink to='features' smooth={true} duration={1000}>Features</ScrollLink></li>
                <li><ScrollLink to='presentaion' smooth={true} duration={1000}>Offer</ScrollLink></li>
                <li><ScrollLink to='about' smooth={true} duration={1000}>About</ScrollLink></li>
                <li><ScrollLink to='contact' smooth={true} duration={1000}>Contact</ScrollLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;
