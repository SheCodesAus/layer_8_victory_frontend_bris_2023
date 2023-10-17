import { Link } from "react-router-dom";

import './Footer.css';

import FacebookIcon from '../../../public/Teal_MentorShip_Facebook.svg';
import InstagramIcon from '../../../public/Teal_MentorShip_Instagram.svg';
import LinkedInIcon from '../../../public/Teal_MentorShip_LinkedIn.svg';
import SlackIcon from '../../../public/Teal_MentorShip_Slack.svg';
import TwitterIcon from '../../../public/Teal_MentorShip_Twitter.svg';

function Footer() {

    return (
        <section>
            <footer>
                <Link 
                to="https://www.facebook.com/shecodesaustralia/" 
                id="facebook"
                >
                    <img src={FacebookIcon} alt="" />
                </Link>
                <Link 
                to="https://www.instagram.com/shecodesaus/?hl=en" 
                id="instagram"
                >
                    <img src={InstagramIcon} alt="" />
                </Link>
                <Link 
                to="https://www.linkedin.com/company/shecodesaustralia/" 
                id="linkedin"
                >
                    <img src={LinkedInIcon} alt="" />
                </Link>
                <Link 
                to="https://join.slack.com/t/shecodesaus/shared_invite/enQtNzQ3ODk1OTQzODc3LTQ2ZWFmNzM0N[…]JkMWMyYWVjMDU3ZThhODJmMTk4YmRjZGMzZDRhZDBhODQwNzdlYmJhNDg1YjE" 
                id="slack"
                >
                    <img src={SlackIcon} alt="" />
                </Link>
                <Link 
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