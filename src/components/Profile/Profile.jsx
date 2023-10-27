import useSelf from "../../hooks/use-self";
import useAuth from "../../hooks/use-auth";
import { useEffect } from "react";

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
      </section>
    </article>
  );
}

export default Profile;
