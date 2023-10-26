import "./Event_card.css";
import { useState } from "react";
import postMentorEvents from "../../api/post-mentor-events";
import useSelf from "../../hooks/use-self";
import Button from "../Buttton/Button";

const EventCard = (props) => {
    const { self, isLoading, error } = useSelf();
    const [errorMessage, setErrorMessage] = useState("");

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

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

    return (
        <>
        <div className="card">
            <h2>{props.EventData.title}</h2>
            <p>Date: {props.EventData.start_date.split("T")[0]}</p>
            <p>Location: {props.EventData.location}</p>
            <Button text={"Apply"} btnClass="btn-info " onClick={handleSendApply} />
            <div>{errorMessage}</div>
        </div>
        </>
    );
};

export default EventCard;
