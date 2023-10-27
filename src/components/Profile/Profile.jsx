import useSelf from "../../hooks/use-self";
import useAuth from "../../hooks/use-auth";
import { useEffect } from "react";
import useMyEvents from "../../hooks/use-myevents";
import useEvents from "../../hooks/use-events";
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { self, isLoading, error } = useSelf();
  const { auth, setAuth } = useAuth();
  const [myEvents, myEventsLoading, myEventsError] = useMyEvents();
  const { events, isEventsLoading, isEventsError } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (self?.is_staff) {
      window.localStorage.setItem("is_staff", "true");
      setAuth({ ...auth, is_staff: "true" });
    }
  }, [self]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleEventClick = (event) => {
    let eventid = event.target.value;
    navigate(`/events/${eventid}`);
  };

  const myEventIds = [];
  for (let myEvent in myEvents) {
    myEventIds.push(myEvents[myEvent]["event_id"]);
  }

  const skills = [];
  for (let skill in self.skills) {
    skills.push(self.skills[skill]["name"]);
  }
  const registeredEvents = [];
  myEventIds.forEach(function (eventid) {
    registeredEvents.push(events.filter((event) => event["id"] == eventid));
  });
  const myRegisteredEvents = registeredEvents.flatMap((event) => event);

  return (
    <article id="profile">
      <h2>
        Hi{" "}
        {`${self.first_name}${self.last_name}`
          ? `${self.first_name} ${self.last_name}`
          : self.username}
        !
      </h2>
      <section id="my-details">
        <h3>My Details</h3>
        <p>Username: {self.username}</p>
        <p>First name: {self.first_name}</p>
        <p>Surname: {self.last_name}</p>
        <p>Email: {self.email}</p>
        <p>
          Linked In Account:{" "}
          {self.linkedin_account == null ? "N/A" : self.linkedin_account}
        </p>
        <p>
          GitHub Profile:{" "}
          {self.github_profile == null ? "N/A" : self.github_profile}
        </p>
        <p>
          Social Account:{" "}
          {self.social_account == null ? "N/A" : self.social_account}
        </p>
        <p>Location: {self.location}</p>
        <p></p>
        <p>
          Have you mentored with us before?{" "}
          {self.has_mentored == false ? "No" : "Yes"}
        </p>
        <p>
          Onboarding Status:{" "}
          {self.onboarding_status == "Ready" ? "Onboarded" : "Being reviewed"}{" "}
        </p>
        <p>Rank: {self.rank}</p>
        <div>
          Skills:{" "}
          {skills.map((item, index) => (
            <div key={index}>
              <input type="checkbox" value={item} checked disabled />
              <label htmlFor={`skills-checkbox-${item}`}> {item}</label>
            </div>
          ))}
        </div>
        <br></br>
        <div>
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
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default Profile;
