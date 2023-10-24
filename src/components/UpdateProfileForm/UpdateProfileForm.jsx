import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSelf from "../../hooks/use-self";
import Button from "../Buttton/Button";
import useAuth from "../../hooks/use-auth";
import Dropdown from "../Dropdown/Dropdown";
import useSkills from "../../hooks/use-skills";
import { isSchemeValid, isUrlValid } from "../../utlities/urlValidation";

function UserUpdateForm() {

  const [errorMessage, setErrorMessage] = useState("");
  const { self, isLoading, error } = useSelf();
  const [ editing, setEditing ] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [formInvalid, setFormInvalid] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [mentored, setMentored] = useState(true);
  const [urlError, setUrlError] = useState("");
  const { skills, skillsLoading, skillsError } = useSkills([]);
  const [formData, setFormData ] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    social_account: "",
    linkedin_account: "",
    github_profile: "",
    username: "",
    has_mentored: false,
    location: "",
    skills: [],
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  
 
    if (skillsLoading) {
      return <p>Loading...</p>;
    }
  
    if (skillsError) {
      return <p>{skillsError.message}</p>;
    }
    
    const handleChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    };
  
    const handleCheckboxChange = (event) => {
      let updatedList = [...checkedState];
      if (event.target.checked) {
        updatedList = [...checkedState, event.target.value];
      } else {
        updatedList.splice(checkedState.indexOf(event.target.value), 1);
      }
      setCheckedState(updatedList);
  
  
      setFormData({ ...formData, skills: updatedList });
    };
  
    const handleSelectionChange = (value) => {
      setFormData({ ...formData, location: value });
    };
  
    const handleBooleanChange = (mentored) => {
   
  
      setFormData({ ...formData, has_mentored: mentored });
    
    };
  
    const handleSubmit = (event) => {
  
      event.preventDefault();
      setFormInvalid("");
      setErrorMessage("");
      setUrlError("");
  
      const urls = [
        formData.social_account,
        formData.linkedin_account,
        formData.github_profile,
      ];
      for (let url in urls) {
        if (urls[url] != "") {
          if (isSchemeValid(urls[url]) && isUrlValid(urls[url])) {
            setUrlError("");
          } else {
            setUrlError(
              "Invalid URL, ensure you are including the protocol. Valid protocols include 'http', 'https', 'ftp' and 'ftps'"
            );
          }
        }
      }
      if (
        (formData.skills &&
        formData.first_name ||
        formData.last_name ||
        formData.email ||
        formData.username ||
        formData.mobile ||
        formData.location ||
        formData.github_profile ||
        formData.social_account ||
        formData.linkedin_account ||
        formData.has_mentored) ||
        formData.skills 
      ) {
        putUser(      // This function does not exist yet - will need to team up with Maya to see where she's at with the update functions
          self.id,
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.username,
          formData.mobile,
          formData.location,
          formData.github_profile,
          formData.social_account,
          formData.linkedin_account,
          formData.has_mentored,
          formData.skills
        )
        .then(() => {
          setEditing(false);
        })
          .catch((error) => {
            setErrorMessage(`${[error.message]}`);
          });
      } else {
        setFormInvalid("You must change one attribute to submit an update.");
      }
    };
  
    return (
      <div className="container-apply">
        <h1 className="apply-title">Update Details</h1>
        <br />
  
        <form className="apply-form" id="form">
  <div className="normal-input">
          <div className="input-container">
            <label htmlFor="first_name">First Name </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="first_name"
              onChange={handleChange}
              defaultValue={self.first_name}
            />
          </div>
  
          <div className="input-container">
            <label htmlFor="last_name">Last Name </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="last_name"
              onChange={handleChange}
              defaultValue={self.last_name}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email </label>
            <br />
            <input
              className="text-input"
              type="email"
              id="email"
              onChange={handleChange}
              defaultValue={self.email}
            />
          </div>
  
          <div className="input-container">
            <label htmlFor="mobile">Mobile </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="mobile"
              onChange={handleChange}
              defaultValue={self.mobile}
            />
          </div>
  
          <div className="input-container">
            <label htmlFor="social_account">Social Account </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="social_account"
              placeholder="url of your Social Account"
              onChange={handleChange}
              defaultValue={self.social_account}
            />
          </div>
  
          <div className="input-container">
            <label htmlFor="linkedin_account">LinkedIn Account </label>
            <br />
            <input
              className="text-input"
              type="url"
              id="linkedin_account"
              placeholder="url of your LinkedIn profile"
              onChange={handleChange}
              defaultValue={self.linkedin_account}
            />
          </div>
  
          <div className="input-container">
            <label htmlFor="github_profile">GitHub </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="github_profile"
              placeholder="url of your GitHub"
              onChange={handleChange}
              defaultValue={self.github_profile}
            />
          </div>
          <div className="input-container">
            <label htmlFor="username">Username </label>
            <br />
            <input
              className="text-input"
              type="text"
              id="username"
              onChange={handleChange}
              defaultValue={self.username}
            />
          </div>
          </div>
  
          <div className="multiple-selection">
            <div className="skills-container">
              <label htmlFor="mentor" className="label-checkbox">
                Have you mentored with us before?{" "}
              </label>
              <br />
              <input
                className="checkbox-apply"
                type="checkbox"
                checked={mentored === (!self.has_mentored)}
                onChange={() => {
                  setMentored(false);
                  handleBooleanChange(false);
                }}
              />
              No
              <input
                className="checkbox-apply"
                id="false_checkbox"
                type="checkbox"
                checked={mentored === self.has_mentored}
                onChange={() => {
                  setMentored(true);
                  handleBooleanChange(true);
                }}
              />
              Yes
            </div>
            <div className="input-container">
              <label htmlFor="Location ">Location </label>
              <br />
              <div>
                <Dropdown
                  arrayValues={[
                    "Brisbane",
                    "Sydney",
                    "Melbourne",
                    "Adelaide",
                    "Perth",
                    "Canberra",
                    "Darwin",
                  ]}
                  defaultValue={self.location}
                  onChange={handleSelectionChange}
                />
              </div>
            </div>
  
            <div className="skills-container">
              <label htmlFor="skills" className="label-checkbox">
                Select skills<span className={formInvalid ? "" : "hidden"}>*</span>{" "}
              </label>
              {skills.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={self.item}
                    value={skills.includes(item)}
                    onChange={handleCheckboxChange}
                    defaultValue={self.item}
                  />
  
                  <label htmlFor={`skills-checkbox-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
  
          <div>
              <Button text={"Submit"} btnClass="btn-info" onClick={handleSubmit} />
          </div>
          <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "hidden" : ""}>
              <p>{formInvalid}</p>
            </sub>
            {urlError && <p>{urlError}</p>}
          </div>
        </form>
      </div>
    );
  };
  

  
//   return (
//     <form className="form">
//       <div>
//         <label htmlFor="first_name">First Name:</label>
//         <input
//           type="text"
//           id="first_name"
//           name="first_name"
//           defaultValue={self.first_name}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="last_name">Surname:</label>
//         <input
//           type="text"
//           id="last_name"
//           name="last_name"
//           defaultValue={self.last_name}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email" className={formIsInvalid ? "error-message" : ""}>
//           Email<span className={formIsInvalid ? "" : "hidden"}>*</span>:
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={self.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label
//           htmlFor="username"
//           className={formIsInvalid ? "error-message" : ""}>
//           Username<span className={formIsInvalid ? "" : "hidden"}>*</span>:
//         </label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           defaultValue={self.username}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="button" onClick={handleSubmit}>
//         Update Details
//       </button>
//       <div className="error-message">
//         {Object.values(errorMessage).map((error, key) => (
//           <p key={key}>Error: {error}</p>
//         ))}
//       </div> 
//       <p className="error-message">{formIsInvalid}</p>
//     </form>
//   );


export default UserUpdateForm;
