import { useState, useEffect } from 'react';

import Banner_1 from '../../../public/banner1.jpeg';
import Banner_2 from '../../../public/banner2.jpeg';
import Banner_3 from '../../../public/banner3.jpeg';

import "./HomePage.css";

const images = [Banner_1, Banner_2, Banner_3];

function HomePage() {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                (prevIndex + 1) % images.length
            );
        }, 3000); 
    
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="section home">
            <div className="overlay">
                <div className="text">
                    <h1>Get Onboard</h1>
                    <p>Apply now to become a She Codes mentor</p>
                </div>
            </div>
            <div className="banner">
                {images.map((image, index) => (
                    <img
                    key={index}
                    className={`banner-image ${currentImageIndex === index ? 'active' : ''}`}
                    src={image}
                    alt={`Image ${index + 1}`}
                    />
                ))}
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