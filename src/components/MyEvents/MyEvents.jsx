
import useMyEvents from "../../hooks/use-myevents";
import useEvents from "../../hooks/use-events";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";
import { useNavigate } from "react-router-dom";

function MyEventsComponent() {
  
  const [myEvents, myEventsLoading, myEventsError] = useMyEvents();
  const { events, eventsLoading, eventsError } = useEvents();
  const navigate = useNavigate();
  


  if (myEventsLoading || eventsLoading) {
    return <p>Loading...</p>;
  }

  if (myEventsError) {
    return <p>{myEventsError.message}</p>;
  }
  
  if (eventsError) {
    return <p>{eventsError.message}</p>;
  }

  const handleEventClick = (event) => {
    let eventid = event.target.value;
    navigate(`/events/${eventid}`);
  };

  const myEventIds = [];
  for (let myEvent in myEvents) {
    myEventIds.push(myEvents[myEvent]["event_id"]);
  }
  const registeredEvents = [];
  myEventIds.forEach(function (eventid) {
    registeredEvents.push(events.filter((event) => event["id"] == eventid));
  });
  const myRegisteredEvents = registeredEvents.flatMap((event) => event);


  return (
        <div id="my-details">
        <h3>Events I`&apos;`ve registered for</h3>
          {myRegisteredEvents.map((event, key) => {
            return (
              <div className="event-single-card" key={key}>
                <div>
                  <p>Date: {convertLocalDateTime(event.start_date)}</p>
                  <p>Title: {event.title}</p>
                  <p>Location: {event.location}</p>
                </div>
                <button
                  className="button"
                  onClick={handleEventClick}
                  value={event.id}>
                  Find out more
                </button>
                <br></br>
              </div>
            );
          })}
        </div>
  );
}

export default MyEventsComponent;
