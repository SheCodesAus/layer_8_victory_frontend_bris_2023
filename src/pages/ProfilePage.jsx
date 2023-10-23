import useSelf from "../hooks/use-self";
import useEvents from "../hooks/use-events";
import { Link } from "react-router-dom";

function ProfilePage() {
  
  const { self, isLoading, error } = useSelf();
  const { events, eventsLoading, eventsError} = useEvents();

  if (isLoading || eventsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }


  return (
    <div>
   
    </div>

  );
}

export default ProfilePage;
