
import { useState } from "react";
import putUser from "../../api/put-user";
import useSelf from "../../hooks/use-self";
import Button from "../Buttton/Button";
import Dropdown from "../Dropdown/Dropdown";
import useSkills from "../../hooks/use-skills";
import { isSchemeValid, isUrlValid } from "../../utlities/urlValidation";
import { emailIsValid } from "../../utlities/emailValidation";

function UserUpdateForm({editing, setEditing}) {

  const [errorMessage, setErrorMessage] = useState("");
  const { self, isLoading, error } = useSelf();
  const [formInvalid, setFormInvalid] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [urlError, setUrlError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const { skills, skillsLoading, skillsError } = useSkills([]);
  const [formData, setFormData ] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    social_account: "",
    linkedin_account: "",
    github_profile: "",
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

    formData.skills = Array.from(document.querySelectorAll('.skills input[type="checkbox"]:checked')).map(x => x.value)

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
    console.log(document.getElementById('email').value == self.email)

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
        if (document.getElementById("email").value == self.email || emailIsValid(formData.email)) {
        setEmailError("");
      } else {
        setEmailError(
          "Please provide a valid email address."
        );
      }
      if (formData.mobile.length == 10 || document.getElementById("mobile").value == self.mobile) {
        setMobileError("");
      } else {
        setMobileError(
          "Mobile number must be no more than 10 characters"
        );
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
        formData.linkedin_account) ||
        formData.skills 
      ) {
        putUser(
          self.id,
          formData.username,
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.mobile,
          formData.location,
          formData.github_profile,
          formData.social_account,
          formData.linkedin_account,
          formData.has_mentored,
          formData.skills
        )
        .then((editing) => {
          setEditing(!editing);
        })
          .catch((error) => {
            setErrorMessage(`${[error.message]}`);
          });
      } else {
        setFormInvalid("You must change one attribute to submit an update.");
      }
    };
  
    return (
      <form className="apply-form background update-form" id="form">
      <img src="/background1.png" alt="" />
      <div className="container-apply">
        <div className="form-container form-container-apply">
          <h1>Update Details</h1>
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

              <div className="input-container input-checkbox bottom">
                <label htmlFor="mentor" className="label-checkbox">
                  Have you mentored with us before?{" "}
                </label>
                <div className="mini-checkbox-container">
                  <input
                    className="checkbox-apply"
                    id="false_checkbox"
                    type="checkbox"
                    checked={self.has_mentored === true}
                    onChange={() => {
                      self.has_mentored = true;
                      handleBooleanChange(true);
                    }}
                  />
                  <label className="checkbox-text yes-label">Yes</label>
                    <input
                      className="checkbox-apply"
                      type="checkbox"
                      checked={self.has_mentored === false}
                      onChange={() => {
                        self.has_mentored = false;
                        handleBooleanChange(false);
                      }}
                    />
                  <label className="checkbox-text">No</label>
                </div>
              </div>
              <div className="input-container input-checkbox">
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

              <div className="input-container input-checkbox">
                <label htmlFor="skills" className="label-checkbox">
                  Select skills{" "}
                </label>
                <div className="skills-checkbox-container">
                  {skills.map((item, index) => (
                    <div key={index} className="mini-checkbox-container">
                      <input
                        className="checkbox-apply"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        value={item}
                        defaultChecked={self.skills.filter(skill => skill.name === item).length > 0}
                      />
      
                      <label htmlFor={`skills-checkbox-${item}`} className="checkbox-text">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-container input-container-hidden">
                <label htmlFor="password" className="input-container-hidden-text">Password</label>
                <br />
                <input
                  className="text-input"
                />
              </div>
            </div>
          </div>

          <div className="apply-button">
              <Button text={"Submit"} btnClass="btn-info" onClick={handleSubmit} />
          </div>
          <div>
            <p className={urlError || emailError ? "hidden" : ""}>{errorMessage}</p> 
            {/* Filtering out generic error message if form validation errors are set*/}
            <sub className={errorMessage ? "hidden" : ""}>
              <p>{formInvalid}</p>
            </sub>
            {<p>{urlError}</p>}
            {<p>{emailError}</p>}
            {<p>{mobileError}</p>}
          </div>
        </div>
    </form>
    );
  };

export default UserUpdateForm;
