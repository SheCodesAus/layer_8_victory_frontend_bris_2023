import EventData from "../../data/events"
import EventCard from "../Cards/EventCard"
import "./EventsForm.css";



const EventForm =() =>{
    return(
       <>
        <div className="event-container">
            <h1>Events</h1>
            <p>Our next events are:</p>
          </div>
    
          <div id = "card-container">
            {EventData.map((event, index) => (
              <EventCard key={index} EventData={event} />
            ))}
          </div>
       
       </>
    )
}

export default EventForm 