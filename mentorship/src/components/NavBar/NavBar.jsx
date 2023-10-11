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
                    <Link to="/" className="logo"><img src="/mentorship/public/2.png" alt="" /></Link>
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
                            to="/signup" 
                            id="signup"
                            className={activeLink === "signup" ? "active" : ""}
                            onClick={() => {
                                setActive("signup");
                                handleLinkClick();
                            }}
                            >
                                Sign Up
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