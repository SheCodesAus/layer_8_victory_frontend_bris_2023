import "./Event_card.css";
import { useState } from "react";
import postMentorEvents from "../../api/post-mentor-events";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";
import useSelf from "../../hooks/use-self";
import Button from "../Buttton/Button";
import { useNavigate } from "react-router-dom";

const EventCard = (props) => {
    const { self, isLoading, error } = useSelf();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleSendApply = (event) => {
        event.preventDefault();
        setErrorMessage("");
        postMentorEvents(props.EventData.id, self.id, false)
        .then(() => {
            window.alert("You have successfully registered for this event.");
        })
        .catch((error) => {
            setErrorMessage(`${[error.message]}`);
        });
    };

    const handleEventClick = (event) => {
        let eventid = event.target.value
        navigate(`/events/${eventid}`)
    }
    
    const start_date = convertLocalDateTime(props.EventData.start_date)

    return (
        <>
        <div className="card">
            <h2>{props.EventData.title}</h2>
            <p>Date: {start_date}</p>
            <p>Location: {props.EventData.location}</p>
            <button className="button" onClick={handleEventClick} value={props.EventData.id}>Find out more</button>
            <Button text={"Apply"} btnClass={self == undefined ? "hidden" : self.onboarding_status == "Ready"? "button" : "hidden"} onClick={handleSendApply} />
            <div>{errorMessage}</div>
        </div>
        </>
    );
};

export default EventCard;
