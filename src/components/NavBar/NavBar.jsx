import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
  
import useAuth from "../../hooks/use-auth";

import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const [activeLink, setActiveLink] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({
            token: null,
            userId: null
        });
    };

    const setActive = (link) => {
        setActiveLink(link);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const mobileNavbar = document.querySelector('#navbar');

        if (menuOpen) {
            navbar.classList.add('active');
            mobileNavbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
            mobileNavbar.classList.remove('active');
        }
    }, [menuOpen]);

    return (
        <div>
            <div>
                <header className="header">
                    <Link to="/" className="logo"><img src="../../../3.png" alt="" /></Link>


                    <Link 
                            to="/dashboard" 
                            id="apply"
                            className={activeLink === "apply" ? "active" : ""}
                            onClick={() => {
                                setActive("apply");
                                handleLinkClick();
                            }}
                            >
                                Dashbaord
                            </Link>
                           
                    <div className="menu-btn" onClick={toggleMenu}>
                        <div className={`menu-burger ${menuOpen ? 'open' : ''}`}></div>
                    </div>
                    <nav className="navbar flex-nav" id="navbar">
                        <Link 
                        to="/" 
                        className={activeLink === "home" ? "active" : ""}
                        id="home"
                        onClick={() => {
                            setActive("home");
                            handleLinkClick();
                        }}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            id="about"
                            className={activeLink === "about" ? "active" : ""}
                            onClick={() => {
                                setActive("about");
                                handleLinkClick();
                            }}
                            >
                                About
                            </Link>
                            <Link 
                            to="/events" 
                            id="events"
                            className={activeLink === "events" ? "active" : ""}
                            onClick={() => {
                                setActive("events");
                                handleLinkClick();
                            }}
                            >
                                Events
                            </Link>
                            <Link 
                            to="/contact" 
                            id="contact"
                            className={activeLink === "contact" ? "active" : ""}
                            onClick={() => {
                                setActive("contact");
                                handleLinkClick();
                            }}
                            >
                                Contact
                            </Link>
                        {auth.token ? (
                            <>
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                            <Link 
                            to="/profile" 
                            id="profile"
                            className={activeLink === "profile" ? "active" : ""}
                            onClick={() => {
                                setActive("profile");
                                handleLinkClick();
                            }}
                            >
                                Profile
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link 
                            to="/login"
                            id="login"
                            className={activeLink === "login" ? "active" : ""}
                            onClick={() => {
                                setActive("login");
                                handleLinkClick();
                            }}
                            >
                                Log In
                            </Link>
                            <Link 
                            to="/apply" 
                            id="apply"
                            className={activeLink === "apply" ? "active" : ""}
                            onClick={() => {
                                setActive("apply");
                                handleLinkClick();
                            }}
                            >
                                Apply
                            </Link>
                            </>
                            
                        )}
                    </nav>
                </header>
                <Outlet />
            </div>
        </div>  
    );
}

export default NavBar;