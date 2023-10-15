// import { useRef} from 'react';
// import { Link } from "react-router-dom";

import "./HomePage.css";


function HomePage() {

    return (
        <section className="section home">
            <div className="welcome">
                <img className="header-image" src="../../public/placeholder-image.jpeg" alt="" />
            </div>
            <div className="information">
                <div className="about-us">
                    <h1>About Us</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <button className="button">More Info</button>
                </div>
                <div className="next-event">
                    <h1>Next Event</h1>
                    <div className="paragraph">
                        <p>DD MM YYYY</p>
                        <p>TITLE</p>
                        <p>LOCATION</p>
                    </div>
                    <button className="button">More Events</button>
                </div>
            </div>
        </section>
    );
}

export default HomePage;