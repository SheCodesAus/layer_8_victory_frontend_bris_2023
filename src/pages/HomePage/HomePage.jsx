import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useEvents from "../../hooks/use-events"
import { useNavigate } from "react-router-dom";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";

import Banner_1 from '/banner1.jpeg';
import Banner_2 from '/banner2.jpeg';
import Banner_3 from '/banner3.jpeg';

import "./HomePage.css";

const images = [Banner_1, Banner_2, Banner_3];

function HomePage() {
    const { events, isEventsLoading, isEventsError } = useEvents();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                (prevIndex + 1) % images.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    if (isEventsLoading) {
        return <p>Loading...</p>;
    }

    if (isEventsError) {
        return <p>{isEventsError.message}</p>;
    }

    const today = new Date().toISOString()
    const publishedEvents = events.filter((event) => event["is_published"] == true)

    const handleEventClick = (event) => {
        let eventid = event.target.value
        navigate(`/events/${eventid}`)
    }

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
                        {publishedEvents.filter((event) => event["start_date"] >= today) ==
                            "" ? (
                            <h2>No upcoming events</h2>
                        ) : (
                            publishedEvents
                                .filter((event) => event["start_date"] >= today)
                                .sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
                                .slice(0, 1)
                                .map((event) => {
                                    return (
                                        <div className="event-single-card">
                                            <div>
                                                <p>Date: {convertLocalDateTime(event.start_date)}</p>
                                                <p>Title: {event.title}</p>
                                                <p>Location: {event.location}</p>
                                            </div>
                                            <button className="button" onClick={handleEventClick} value={event.id}>Find out more</button>
                                        </div>
                                    );
                                })
                        )}
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