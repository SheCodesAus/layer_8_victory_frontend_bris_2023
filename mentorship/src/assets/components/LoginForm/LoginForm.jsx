import Button from "../Buttton/Button";
import "./loginForm.css";


const LoginForm  = () =>{
return(
    <form className="login">
    <div>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            id="username" 
            placeholder="Enter username"
       />
    </div>
    <div>
        <label htmlFor="password">Password:</label>
        <input 
            type="password" 
            id="password" 
            placeholder="Password"
        />      
    </div>
    <Button text={"Login"} btnClass = "btn-info " />
  
   
</form> 
)
}

export default LoginForm