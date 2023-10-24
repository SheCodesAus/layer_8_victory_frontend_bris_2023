import useSelf from "../hooks/use-self";
import useEvents from "../hooks/use-events";
// import useMyEvents from "../hooks/use-myevents";
import Button from "../components/Buttton/Button";
import Profile from "../components/Profile.Jsx";
import UserUpdateForm from "../components/UpdateProfileForm";
import { Link } from "react-router-dom";
import { useState } from "react";

function ProfilePage() {
  
  const { self, isLoading, error } = useSelf();
  const { events, eventsLoading, eventsError} = useEvents();
  // const { myEvents, myEventsLoading, myEventsError} = useEvents();
  const [ editing, setEditing ] = useState(false);

  if (isLoading || eventsLoading ) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (eventsError) {
    return <p>{eventsError.message}</p>;
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    setEditing(!editing);
    }

  return (
<div>
    <main id="profile-page" >
    {editing == false ? <><Profile /> 
      <Button text={"Update my details"} btnClass = "btn-info " onClick={handleUpdate}/></>
      : <><UserUpdateForm/><Button text={"Return to profile view"} btnClass = "btn-info " onClick={handleUpdate}/></>}
    </main>      
    </div>

  );
}

export default ProfilePage;
