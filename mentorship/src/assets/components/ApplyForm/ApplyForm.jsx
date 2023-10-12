import Button from "../Buttton/Button";
import "./ApplyForm.css";
import Dropdown from "../Dropdown/Dropdown";

const ApplyForm = () =>{

    return(
        <div className="container-apply">
        
        <h1 className="apply-title">Apply Now</h1><br/>

        <form className="apply-form">
            

            
       <div className="input-container">
        <label htmlFor="name ">First Name </label><br/>
                <input 
                className="text-input"
                type="text" 
                id="first_name" 
            
           />
        </div>
        
        
        
        <div className="input-container">
        <label htmlFor="name ">Last Name </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="last_name" 
              
            />      
        </div>
        <div className="input-container">
        <label htmlFor="email ">Email </label><br/>
        <input 
                className="text-input"
                type="email" 
                id="email" 
          
              
            />
        </div>
        <div className="input-container">
        <label htmlFor="mobile ">Mobile </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="mobile" 
                placeholder="Mobile"
               
            />   
            </div>

            <div className="input-container">
           <label htmlFor="cv ">CV </label><br/>
            <input 
                className="text-input"
                type="text" 
                id="cv" 
                placeholder="URL"
         
            />     
        </div>


    <div className="input-container">
    <label htmlFor="username ">Username</label><br/>
    <input 
                className="text-input"
                type="text" 
                id="username" 
  
      
            />      
        
        
        </div>

        <div className="input-container">
        <label htmlFor="password ">Password</label><br/>
            <input  
                className="text-input"
                type="password" 
                id="password" 

           
            />  
</div>
    
            <div className="input-container">
            <label htmlFor="Location ">Location </label><br/>
            <div>
                <Dropdown arrayValues={["Brisbane"," Melbourne", "Sidney"]}  onChange={(event)}/>
            </div> 
            </div>
           
            <div className="input-container">
            <label htmlFor="Skills ">Skills </label><br/>
            <div>
                <Dropdown arrayValues={["Junior"," Mid-level", "Lead"]}  onChange={(event)}/>
            </div>    
             </div>


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
    

      



        <div>
        <Button text={"Submit"} btnClass = "btn-info " />
        </div>

    </form> 

    </div>
    )
}

export default ApplyForm