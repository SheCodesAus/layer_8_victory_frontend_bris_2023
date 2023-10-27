import useEvents from "../../hooks/use-events";
import EventCard from "../../components/Cards/EventCard";
import "./EventsForm.css";

const EventForm = () => {
  const { events } = useEvents();
  return (
    <>
      <div className="event-container">
        <h1 className="event_title">Events</h1>
        <p>Our next events are:</p>
      </div>

      <div id="card-container">
        {events
          .filter((event) => event["is_published"] == true)
          .sort((a, b) => (b.start_date < a.start_date ? 1 : -1))
          .map((event, index) => (
            <EventCard key={index} EventData={event} />
          ))}
      </div>
    </>
  );
};

export default EventForm;
