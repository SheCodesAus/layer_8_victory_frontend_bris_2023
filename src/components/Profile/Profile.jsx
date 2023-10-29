import useSelf from "../../hooks/use-self";
import useAuth from "../../hooks/use-auth";
import { useEffect } from "react";
import "./Profile.css";

function Profile() {
  const { self, isLoading, error } = useSelf();
  const {auth, setAuth} = useAuth();

  useEffect(() =>{
    if (self?.is_staff){
      window.localStorage.setItem("is_staff", "true")
      setAuth({...auth,
      is_staff:"true"
    }) 
  }

  }, [self])

  if (isLoading ) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }


  const skills = [];
  for (let skill in self.skills) {
    skills.push(self.skills[skill]["name"]);
  }

  return (
    <div id="profile_container_mentor" className="background">
      <img src="/background1.png" alt=""/>
      <div className="container-profile">
        <h2 className="profile_title">
          Hi,{" "}
          {`${self.first_name}${self.last_name}`
            ? `${self.first_name} ${self.last_name}`
            : self.username}
          !
        </h2>
        {/* <h3>My Details</h3> */}
        <div id="my-details">
          <div className="details1">
            <p className="my-details-paragraph">Username: {self.username}</p>
            <p className="my-details-paragraph">First name: {self.first_name}</p>
            <p className="my-details-paragraph">Surname: {self.last_name}</p>
            <p className="my-details-paragraph">Email: {self.email}</p>
            <p className="my-details-paragraph">Location: {self.location}</p>
            <p className="my-details-paragraph">
              Have you mentored with us before?{" "}
              {self.has_mentored == false ? "No" : "Yes"}
            </p>
          </div>
          <div className="details2">
            <p className="my-details-paragraph">Linked In Account: {self.linkedin_account == null ? "N/A" : self.linkedin_account}</p>
            <p className="my-details-paragraph">GitHub Profile: {self.github_profile == null ? "N/A" : self.github_profile}</p>
            <p className="my-details-paragraph">Social Account: {self.social_account == null ? "N/A" : self.social_account}</p>
            <p className="my-details-paragraph">
              Onboarding Status:{" "}
              {self.onboarding_status == "Ready" ? "Onboarded" : "Being reviewed"}{" "}
            </p>
            <p className="my-details-paragraph">Rank: {self.rank}</p>
            <p className="my-details-paragraph" >
              Skills:{" "}
              {skills.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" value={item} checked disabled />
                  <label htmlFor={`skills-checkbox-${item}`}> {item}</label>
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Profile;
