// import { Link } from "react-router-dom";

import './AboutPage.css';

function AboutPage() {

    return (
        <section className="section about">
            <div className="photo">
                <img src="/mentoring1.jpeg" alt="" />
            </div>
            <div className='about-text'>
                <h1>About US</h1>
                <p>MentorShip connects professionals in the technology industry with aspiring coders.</p>
                <p>
                    At MentorShip, we believe that guidance and support can make all the difference to one&apos;s career route, and we make it easy for both mentors and learners to connect, exchange insights, and develop their coding skills.
                </p>
                <p>By offering a range of events and coding workshops, MentorShip creates a supportive environment in which people can learn to code. MentorShip is the go-to platform for anyone looking to give back to their industry and begin their mentoring voyage.</p>
                <p>Get onboard now and set sail on your mentoring journey!</p>
            </div>
        </section>
    );
}

export default AboutPage;