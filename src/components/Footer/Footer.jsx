import { Link } from "react-router-dom";

import './Footer.css';

import FacebookIcon from '/Teal_MentorShip_Facebook.svg';
import InstagramIcon from '/Teal_MentorShip_Instagram.svg';
import LinkedInIcon from '/Teal_MentorShip_LinkedIn.svg';
import SlackIcon from '/Teal_MentorShip_Slack.svg';
import TwitterIcon from '/Teal_MentorShip_Twitter.svg';

function Footer() {

    return (
        <section className="footer">
            <div className="footer-text">
                <p>&copy; 2023 MentorShip</p>
            </div>
            <footer>
                <Link 
                className="icon"
                to="https://www.facebook.com/shecodesaustralia/" 
                id="facebook"
                >
                    <img src={FacebookIcon} alt="" />
                </Link>
                <Link 
                className="icon"
                to="https://www.instagram.com/shecodesaus/?hl=en" 
                id="instagram"
                >
                    <img src={InstagramIcon} alt="" />
                </Link>
                <Link 
                className="icon"
                to="https://www.linkedin.com/company/shecodesaustralia/" 
                id="linkedin"
                >
                    <img src={LinkedInIcon} alt="" />
                </Link>
                <Link 
                className="icon"
                to="https://shecodesaus.slack.com/join/shared_invite/enQtNzQ3ODk1OTQzODc3LTQ2ZWFmNzM0NjE1MjA0NTI3YjJkMWMyYWVjMDU3ZThhODJmMTk4YmRjZGMzZDRhZDBhODQwNzdlYmJhNDg1YjE#/shared-invite/email" 
                id="slack"
                >
                    <img src={SlackIcon} alt="" />
                </Link>
                <Link 
                className="icon"
                to="https://twitter.com/shecodesaus" 
                id="twitter"
                >
                    <img src={TwitterIcon} alt="" />
                </Link>
            </footer>
        </section>
    );
}

export default Footer;