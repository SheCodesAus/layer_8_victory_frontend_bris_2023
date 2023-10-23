import useSelf from "../hooks/use-self";
import useEvents from "../hooks/use-events";
import useMyEvents from "../hooks/use-myevents";
import Button from "../components/Buttton/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const { self, isLoading, error } = useSelf();
  const { events, eventsLoading, eventsError } = useEvents();
  const { myEvents, myEventsLoading, myEventsError } = useEvents();
  const [editing, setEditing] = useState(false);

  if (isLoading || eventsLoading || myEventsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }


  const skills = [];
  for (let skill in self.skills) {
    skills.push(self.skills[skill]["name"]);
  }

  console.log(self.is_staff)
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
        <p>Linked In Account: {self.linkedin_account == null ? "N/A" : self.linkedin_account}</p>
        <p>GitHub Profile: {self.github_profile == null ? "N/A" : self.github_profile}</p>
        <p>Social Account: {self.social_account == null ? "N/A" : self.social_account}</p>
        <p>
          Have you mentored with us before?{" "}
          {self.has_mentored == false ? "No" : "Yes"}
        </p>
        <p>
          Onboarding Status:{" "}
          {self.onboarding_status == "Ready" ? "Onboarded" : "Being reviewed"}{" "}
        </p>
        <p>
          Skills:{" "}
          {skills.map((item, index) => (
            <div key={index}>
              <input type="checkbox" value={item} checked disabled />
              <label htmlFor={`skills-checkbox-${item}`}> {item}</label>
            </div>
          ))}
        </p>
        
        <br></br>
      </section>
    </article>
  );
}

export default Profile;
