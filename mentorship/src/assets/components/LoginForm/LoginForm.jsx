import Button from "../Buttton/Button";
import "./LoginForm.css";


const LoginForm  = () =>{
return(
    <form className="login-form">
    <div>
        <h1>Login</h1>
            <label htmlFor="username">Username </label><br/>
            <input 
            type="text" 
            id="username" 
            placeholder="Enter username"
       />
    </div>
    <br/>
    <div>
        <label htmlFor="password">Password </label><br/>
        <input 
            type="password" 
            id="password" 
            placeholder="Password"
        />      
    </div>
    <br/>
    <Button text={"Login"} btnClass = "btn-info " />
  
   
</form> 
)
}

export default LoginForm