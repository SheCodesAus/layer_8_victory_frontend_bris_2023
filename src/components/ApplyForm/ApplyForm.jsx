import Button from "../../components/Buttton/Button";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import postCreateAccount from "../../api/post_create_account";
import postLogin from "../../api/post_login";
import useSkills from "../../hooks/use-skills";
import { isSchemeValid, isUrlValid } from "../../utlities/urlValidation";
import "./ApplyForm.css";

const ApplyForm = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [formInvalid, setFormInvalid] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [mentored, setMentored] = useState(true);
  const [urlError, setUrlError] = useState("");
  const { skills, skillsLoading, skillsError } = useSkills([]);
  const [signupdetails, setSignupDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    social_account: "",
    linkedin_account: "",
    github_profile: "",
    username: "",
    password: "",
    has_mentored: false,
    location: "",
    skills: [],
  });

  if (skillsLoading) {
    return <p>Loading...</p>;
  }

  if (skillsError) {
    return <p>{skillsError.message}</p>;
  }
  
  const handleChange = (event) => {
    const { id, value } = event.target;
    setSignupDetails((prevDetails) => ({
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

    // console.log(updatedList);
    setSignupDetails({ ...signupdetails, skills: updatedList });
  };

  const handleSelectionChange = (value) => {
    setSignupDetails({ ...signupdetails, location: value });
  };

  const handleBooleanChange = (mentored) => {
    // console.log(mentored);

    setSignupDetails({ ...signupdetails, has_mentored: mentored });
    // console.log(signupdetails);
  };

  const handleSubmit = (event) => {
    // console.log(signupdetails);
    event.preventDefault();
    setFormInvalid("");
    setErrorMessage("");
    setUrlError("");

    const urls = [
      signupdetails.social_account,
      signupdetails.linkedin_account,
      signupdetails.github_profile,
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
      signupdetails.first_name &&
      signupdetails.last_name &&
      signupdetails.email &&
      signupdetails.mobile &&
      signupdetails.username &&
      signupdetails.password &&
      signupdetails.location &&
      signupdetails.skills
    ) {
      postCreateAccount(
        signupdetails.first_name,
        signupdetails.last_name,
        signupdetails.email,
        signupdetails.mobile,
        signupdetails.social_account,
        signupdetails.linkedin_account,
        signupdetails.github_profile,
        signupdetails.username,
        signupdetails.password,
        signupdetails.has_mentored,
        signupdetails.location,
        signupdetails.skills
      )
        .then(() => {
          postLogin(signupdetails.username, signupdetails.password).then(
            (response) => {
              window.localStorage.setItem("token", response.token);
              setAuth({
                token: response.token,
              });
              navigate("/events");
            }
          );
        })
        .catch((error) => {
          setErrorMessage(`${[error.message]}`);
        });
    } else {
      setFormInvalid("Please complete all required fields and ensure you are entering a valid email address.");
    }
  };

  return (
    <div className="container-apply">
      <h1 className="apply-title">Apply Now</h1>
      <br />

      <form className="apply-form" id="form">
        <div className="input-container">
          <label htmlFor="first_name">First Name<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="text"
            id="first_name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="last_name">Last Name<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="text"
            id="last_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="email"
            id="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="mobile">Mobile<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="text"
            id="mobile"
            onChange={handleChange}
            required
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
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="text"
            id="username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password<span className={formInvalid ? "" : "hidden"}>*</span> </label>
          <br />
          <input
            className="text-input"
            type="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="multiple-selection">
          <div>
            <label htmlFor="mentor" className="label-checkbox">
              Have you mentored with us before?{" "}
            </label>
            <br />
            <input
              className="checkbox-apply"
              type="checkbox"
              checked={mentored === false}
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
              checked={mentored === true}
              onChange={() => {
                setMentored(true);
                handleBooleanChange(true);
              }}
            />
            Yes
          </div>
          <div className="input-container">
            <label htmlFor="Location ">Location<span className={formInvalid ? "" : "hidden"}>*</span> </label>
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
                  value={item}
                  onChange={handleCheckboxChange}
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

export default ApplyForm;
