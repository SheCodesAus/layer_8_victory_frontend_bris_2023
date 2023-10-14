import React, {useState} from "react";
import{ Link, Outlet }from"react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaTimes} from "react-icons/fa";
import "./navbar.css";


const NavBar = () =>
{
    const [isMobile, setIsMobile] = useState(false)
    return (
    <>
        <nav className="navbar">
        <h3 className="logo">MentorShip</h3>
        <ul className={isMobile ? "nav-links-mobile":"nav-links"}
onClick = {()=>  setIsMobile(false)}>
     
            <Link to="/events" className="events" ><li>Events</li></Link>
            <Link to="/apply" className="apply"><li>Apply</li></Link>
            <Link to="/login" className="login" ><li>Login</li></Link>
            <Link to="/contact" className="contact" ><li>Contact</li></Link>
                
        </ul> 
        <button className="mobile-menu-icon"
    onClick={()=>setIsMobile(!isMobile)}>
      {isMobile?(<i><FaTimes/> </i>):(<i ><GiHamburgerMenu/></i>)}
    </button>
        </nav>
        <Outlet />  
    </>
        
    );
}

export default NavBar;