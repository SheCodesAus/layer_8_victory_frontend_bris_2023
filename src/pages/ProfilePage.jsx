import useSelf from "../hooks/use-self";
import useAuth from "../hooks/use-auth";
import useMyEvents from "../hooks/use-myevents";
import useEvents from "../hooks/use-events";
import { convertLocalDateTime } from "../utlities/convertLocalDateTime";
import NotFound404Page from "../components/NotFound404Page/NotFound404Page";
import Button from "../components/Buttton/Button";
import Profile from "../components/Profile/Profile.jsx";
import UserUpdateForm from "../components/UpdateProfileForm/UpdateProfileForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  
  const { auth, setAuth } = useAuth();
  const { self, isLoading, error } = useSelf();
  const [ editing, setEditing ] = useState(false);
  const [myEvents, myEventsLoading, myEventsError] = useMyEvents();
  const { events, isEventsLoading, isEventsError } = useEvents();
  const navigate = useNavigate();
  
  if(!auth.token) {
    return <NotFound404Page/>
  }

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

  const handleUpdate = (event) => {
    event.preventDefault();
    setEditing(!editing);
    }

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
    <div>
      <main id="profile-page" >
      {
        editing == false ? <><Profile /> 
        <Button text={"Update Details"} btnClass = "btn-info" onClick={handleUpdate}/>
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
        </>
        : <>
        <UserUpdateForm editing={editing} setEditing={setEditing}/>
          <Button text={"Return to profile view"} btnClass = "btn-info update-button" onClick={handleUpdate}/>
        </>
      }
      </main>
    </div>

  );
}

export default ProfilePage;
