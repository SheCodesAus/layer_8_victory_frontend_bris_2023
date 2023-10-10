import Button from "../Buttton/Button";
import "./applyForm.css";


const ApplyForm = () =>{
    return(
        <form className="apply">
        <div>
                <label htmlFor="First Name">Name:</label>
                <input 
                type="text" 
                id="first_name" 
                placeholder="First Name"
           />
        </div>
        <div>
            <label htmlFor="Last Name">Last Name:</label>
            <input 
                type="text" 
                id="last_name" 
                placeholder="Last Name"
            />      
        </div>
        <Button text={"Login"} btnClass = "btn-info " />
      
       
    </form> 
    )
}

export default ApplyForm