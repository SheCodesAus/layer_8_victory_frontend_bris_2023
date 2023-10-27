import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import Banner_1 from '/banner1.jpeg';
import Banner_2 from '/banner2.jpeg';
import Banner_3 from '/banner3.jpeg';

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
                    <Link 
                    to="/apply" 
                    id="apply"
                    >
                        <p>Apply now to become a mentor</p>
                    </Link>
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
                    At MentorShip, we're dedicated to connecting technology industry professionals with 
                    aspiring coders, fostering career growth through mentorship, insightful exchanges, 
                    and skill development opportunities.
                    </p>
                    <Link
                    to="/about" 
                    >
                        <button className="button">More Info</button>
                    </Link>
                </div>
                <div className="next-event">
                    <h1>Next Event</h1>
                    <div className="paragraph">
                        <p>DD MM YYYY</p>
                        <p>TITLE</p>
                        <p>LOCATION</p>
                    </div>
                    <Link
                    to="/events" 
                    >
                        <button className="button">More Events</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomePage;