import "./Event_card.css";
import { useState } from "react";
import postMentorEvents from "../../api/post-mentor-events";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";
import useSelf from "../../hooks/use-self";
import Button from "../Buttton/Button";

const EventCard = (props) => {
    const { self, isLoading, error } = useSelf();
    const [errorMessage, setErrorMessage] = useState("");


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
    
    const start_date = convertLocalDateTime(props.EventData.start_date)

    return (
        <>
        <div className="card">
            <h2>{props.EventData.title}</h2>
            <p>Date: {start_date}</p>
            <p>Location: {props.EventData.location}</p>
            <Button text={"Apply"} btnClass={self == undefined ? "hidden" : self.onboarding_status == "Ready"? "btn-info" : "hidden"} onClick={handleSendApply} />
            <div>{errorMessage}</div>
        </div>
        </>
    );
};

export default EventCard;
