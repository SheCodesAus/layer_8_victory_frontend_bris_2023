import useSelf from "../hooks/use-self";
import Button from "../components/Buttton/Button";
import Profile from "../components/Profile/Profile.jsx";
import UserUpdateForm from "../components/UpdateProfileForm/UpdateProfileForm";
import { useState } from "react";

function ProfilePage() {
  
  const { self, isLoading, error } = useSelf();
  const [ editing, setEditing ] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
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
