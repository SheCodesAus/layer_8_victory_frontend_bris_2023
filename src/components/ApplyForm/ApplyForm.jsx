import Button from "../../components/Buttton/Button";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/use-auth"
import Dropdown from "../Dropdown/Dropdown";
import "./ApplyForm.css";

const ApplyForm = () =>{
    const navigate = useNavigate();
    const {auth, setAuth } = useAuth()

    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    const [checkedState, setCheckedState] = useState([]);
    // until we have a separate get request for skills list:
    const skills = [ "Python", "Django", "DRF", "React", "Javascript", "Front-end",  "Back-end", "HTML-CSS"]

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
    })

    const handleChange = (event) => {
        if (!auth.token) {
            const {id, value} = event.target;
            setSignupDetails((prevDetails) => ({
                ...prevDetails,
                [id]: value,
            }))
            console.log(signupdetails)
    }   else {
        setFormInvalid("Already signed in")
    }
    }

    const handleCheckboxChange = (event) => {
        let updatedList = [...checkedState]
        if (event.target.checked) {
            updatedList = [...checkedState, event.target.value]
        } else {
            updatedList.splice(checkedState.indexOf(event.target.value),1)
        }
        setCheckedState(updatedList)


        setSignupDetails({...signupdetails,
            skills: updatedList
    
        })
    }

    const handleSelectionChange =(value) =>{
        setSignupDetails({...signupdetails,
        location: value})
    }

    const handleSubmit = (event) => {

        console.log(signupdetails.skills)

        console.log(signupdetails)

         event.preventDefault()

        // if (!auth.token){
        //     if(signupdetails.username && 
        //         signupdetails.password && 
        //         signupdetails.first_name && 
        //         signupdetails.last_name && 
        //         signupdetails.email &&
        //         signupdetails.mobile &&
        //         signupdetails.location &&
        //         signupdetails.cv && 
        //         signupdetails.skills &&
        //         signupdetails.social_account &&
        //         signupdetails.linkedin_account) {
                // postCreateAccount(
                //     signupdetails.username,
                //     signupdetails.password,
                //     signupdetails.first_name,
                //     signupdetails.last_name,
                //     signupdetails.email,
                //     signupdetails.mobile,
                //     signupdetails.location,
                //     signupdetails.cv,
                //     signupdetails.skills,
                //     signupdetails.social_account,
                //     signupdetails.linkedin_account
                // ).then((response) => {
                    // Endpoint not yet available
                    // postLogin(
                    //     signupdetails.username, 
                    //     signupdetails.password).then(
                    //     (response) => {
                    //         window.localStorage.setItem("token", response.token)
                    //         window.localStorage.setItem("id", response.id)
                    //         navigate(`../user/${window.localStorage.getItem("id")}`)
                    //         setAuth({token: response.token, id: response.id})
                    //     }
                        
                    // ).catch((error)=>{setErrorMessage(`${[error.message]}`)})
        //         }).catch((error)=>{setErrorMessage(`${[error.message]}`)})
                
        //     } else {
        //         setFormInvalid("Please complete the form")
        //     }
        // } else {
        //     setFormInvalid("Already signed in")
        // }
        }

    

    return(
        <div className="container-apply">
        
        <h1 className="apply-title">Apply Now</h1><br/>

        <form className="apply-form">
            

            
       <div className="input-container">
        <label htmlFor="first_name ">First Name </label><br/>
                <input 
                className="text-input"
                type="text" 
                id="first_name" 
                onChange={handleChange}
            
           />
        </div>
        
        
        
        <div className="input-container">
        <label htmlFor="last_name ">Last Name </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="last_name" 
                onChange={handleChange}
              
            />      
        </div>
        <div className="input-container">
        <label htmlFor="email ">Email </label><br/>
        <input 
                className="text-input"
                type="email" 
                id="email" 
                onChange={handleChange}
          
              
            />
        </div>

        <div className="input-container">
        <label htmlFor="mobile ">Mobile </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="mobile" 
                onChange={handleChange}
               
            />   
            </div>

        <div className="input-container">
            <label htmlFor="social_account">Social Account </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="social_account" 
                placeholder="url of your Social Account"
                onChange={handleChange}
            />      
        </div>

        <div className="input-container">
            <label htmlFor="linkedin_account">LinkedIn Account </label><br/>
            <input 
                className="text-input"
                type="url" 
                id="linkedin_account" 
                placeholder="url of your LinkedIn profile"
                onChange={handleChange}
            />      
        </div>

        <div className="input-container">
           <label htmlFor="github_profile">GitHub </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="github_profile" 
                placeholder="url of your GitHub"
                onChange={handleChange}
         
            />     
        </div>
    <div className="input-container">
    <label htmlFor="username ">Username </label><br/>
    <input 
                className="text-input"
                type="text" 
                id="username" 
                onChange={handleChange}
  
      
            />      
        
        
        </div>

        <div className="input-container">
        <label htmlFor="password ">Password </label><br/>
            <input  
                className="text-input"
                type="password" 
                id="password" 
                onChange={handleChange}

           
            />  
</div>
<div className="multiple-selection">


<div>
    <label htmlFor="mentor" className="label-checkbox">Have you mentored with us before? </label><br/>
    
    <label className="checkbox-apply">
        <input type="checkbox" />
        Yes
      </label>
    <label className="checkbox-apply">
        <input type="checkbox" />
        No
      </label>
    </div>
            <div className="input-container">
            <label htmlFor="Location ">Location </label><br/>
            <div>
                <Dropdown arrayValues={["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra",  "Darwin"]}  onChange={handleSelectionChange}/>
            </div> 
            </div>
           
         
            <div className="skills-container">
            <label htmlFor="skills" className="label-checkbox">Select skills </label>
            {skills.map((item, index) => (
              <div key={index}>
                    <input
                        type='checkbox'
                        value={item}
                        onChange={handleCheckboxChange}/>

                        <label htmlFor={`skills-checkbox-${item}`}>{item}</label>
                </div>
    
                ))}
            {/* <div>{`Items checked are: ${checkedItems}`}</div> */}
        </div>

        </div>

        <div>
        <Button text={"Submit"} btnClass = "btn-info " onClick={handleSubmit}/>
        </div>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
        </div>

    </form> 

    </div>
    )
}

export default ApplyForm

{/* <div className="input-container">
<label htmlFor="Skills ">Skills </label><br/>
<div>
    <Dropdown arrayValues={["Junior"," Mid-level", "Lead"]}  onChange={(event)}/>
</div>    
 </div> */}