import useSelf from "../hooks/use-self";
import useAuth from "../hooks/use-auth";
import NotFound404Page from "../components/NotFound404Page/NotFound404Page";
import Button from "../components/Buttton/Button";
import Profile from "../components/Profile/Profile.jsx";
import UserUpdateForm from "../components/UpdateProfileForm/UpdateProfileForm";
import { useState } from "react";

function ProfilePage() {
  
  const { auth, setAuth } = useAuth();
  const { self, isLoading, error } = useSelf();
  const [ editing, setEditing ] = useState(false);
  
  if(!auth.token) {
    return <NotFound404Page/>
  }

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
      {
        editing == false ? <><Profile /> 
        <Button text={"Update my details"} btnClass = "btn-info" onClick={handleUpdate}/>
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
