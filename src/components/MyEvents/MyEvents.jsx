import useMyEvents from "../../hooks/use-myevents";
import useEvents from "../../hooks/use-events";
import putMentorEvents from "../../api/put-mentor-events";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyEvents.css";

function MyEventsComponent() {
	const [errorMessage, setErrorMessage] = useState("");
	const [myEvents, myEventsLoading, myEventsError] = useMyEvents();
	const { events, eventsLoading, eventsError } = useEvents();
	const navigate = useNavigate();

	// Adding event detail fields to myEvents objects
	for (let myEvent in myEvents) {
		let thisEvent = events.filter(
			(event) => event["id"] == myEvents[myEvent]["event_id"]
		)[0];
		myEvents[myEvent].title = thisEvent.title;
		myEvents[myEvent].start_date = thisEvent.start_date;
		myEvents[myEvent].end_date = thisEvent.end_date;
		myEvents[myEvent].location = thisEvent.location;
	}

	if (myEventsLoading || eventsLoading) {
		return <p>Loading...</p>;
	}

	if (myEventsError) {
		return <p>{myEventsError.message}</p>;
	}

	if (eventsError) {
		return <p>{eventsError.message}</p>;
	}

	const handleUpdateClick = (event) => {
		event.preventDefault();
		let mentorEvent = myEvents.filter(
			(myEvent) => myEvent["id"] == event.target.value
		)[0];
		mentorEvent.available = !mentorEvent.available;
		putMentorEvents(
			mentorEvent.id,
			mentorEvent.confirmed,
			mentorEvent.available
		)
			.then(() => {
				window.alert(
					"You have updated your availibility for the " +
						mentorEvent.title +
						" event."
				);
				navigate("/profile");
			})
			.catch((error) => {
				setErrorMessage("Error updating availability, please try again later.");
				window.alert(errorMessage);
			});
	};

	// Navigating to full event view - after clicking "Find out more" button for a given registered event
	const handleEventClick = (event) => {
		let eventid = event.target.value;
		navigate(`/events/${eventid}`);
	};

return (
	<section>
		{myEvents != "" ? (
			<div id="my-details-events">
				<h3>Events I`&apos;`ve registered for</h3>
					{myEvents.map((event, key) => {
						return (
							<div className="event-single-card" key={key}>
								<div>
									<p>Date: {convertLocalDateTime(event.start_date)}</p>
									<p>Title: {event.title}</p>
									<p>Location: {event.location}</p>
									<p>Availabile: {event.available == true ? "Yes" : "No"}</p>
									<p>Confirmed: {event.confirmed == true ? "Yes" : "No"}</p>
								</div>
								<button
									className="button-profile-event"
									onClick={handleEventClick}
									value={event.event_id}>
									Find out more
								</button>
								<button
									className="button"
									onClick={handleUpdateClick}
									value={event.id}>
									{event.available ? "I'm not available" : "Update to available"}
								</button>
								<br></br>
							</div>
						);
					})}
				</div>
			) : (
				""
			)}
		</section>
	);
}

export default MyEventsComponent;
