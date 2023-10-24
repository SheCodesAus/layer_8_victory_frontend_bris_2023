import "./Event_card.css";
import Button from "../Buttton/Button";
import { useNavigate } from "react-router-dom";

const EventCard = (props) => {
    
const navigate = useNavigate();
const handleSendApply = ()=>{
    navigate("/apply")
}
return(
    <>
    <div className="card">
        <h2>{props.EventData.title}</h2>
        <p>Date: {props.EventData.start_date.split("T")[0]}</p>
        <p>Location: {props.EventData.location}</p>
        <Button text={"Apply"} btnClass = "btn-info " onClick={handleSendApply}/>
    </div>
    </>
)
}

export default EventCard;