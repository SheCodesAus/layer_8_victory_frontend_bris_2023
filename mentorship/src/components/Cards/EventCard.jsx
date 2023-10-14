// import{ Link }from"react-router-dom";
import "./Event_card.css";

const EventCard = (props) => {

return(
    <>
    <div className="card">
        <h2>{props.EventData.title}</h2>
        <p>Date: {props.EventData.start_date.split("T")[0]}</p>
        <p>Location: {props.EventData.location}</p>
    </div>
    </>
)
}

export default EventCard;