import Button from "../Buttton/Button";
import "./ApplyForm.css";
import Dropdown from "../Dropdown/Dropdown";

const ApplyForm = () =>{

    return(
        
        <form className="apply-form">
        <div>
        <h1>Apply Now</h1>
                <label htmlFor="First Name">First Name </label><br/>
                <input 
                className="text-input"
                type="text" 
                id="first_name" 
                placeholder="First Name"
           />
        </div>
        <br/>
        <div>
            <label htmlFor="Last Name">Last Name </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="last_name" 
                placeholder="Last Name"
            />      
        </div>
        <br/>
        <div>
            <label htmlFor="Email">Email </label><br/>
            <input 
                className="text-input"
                type="email" 
                id="email" 
                placeholder="Email"
            />      
        </div>
        <br/>
        <div>
            <label htmlFor="Mobile">Mobile </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="mobile" 
                placeholder="Mobile"
            />      
        </div>
        <br/>
        <div>
            <label htmlFor="Location ">Location </label><br/>
            <div>
                <Dropdown arrayValues={["Brisbane"," Melbourne", "Sidney"]}  onChange={(event)}/>
            </div>    
        </div><br/>
        <div>
            <label htmlFor="Skills ">Skills </label><br/>
            <div>
                <Dropdown arrayValues={["Junior"," Mid-level", "Lead"]}  onChange={(event)}/>
            </div>    
        </div>
        <br/>
        <div>
            <label htmlFor="CV ">CV </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="cv" 
                placeholder="URL"
            
            />     
        </div>
        <br/>
        <div>
            <label htmlFor="Username">Username </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="username" 
                placeholder="Username"
            />      
        </div>
        <br/>
        <div>
            <label htmlFor="Password">Password </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="password" 
                placeholder="Password"
            />      
        </div>
        <br/>
        <div>
            <label >Have you mentored with us before? </label><br/>
            <label className="checkbox" >
        <input type="checkbox" />
         Yes
      </label>  
      <label>
        <input type="checkbox" />
         No
      </label>   
        </div>
        <br/>
        <Button text={"Submit"} btnClass = "btn-info " />
    </form> 
    )
}

export default ApplyForm