import Button from "../Buttton/Button";
import "./LoginForm.css";


const LoginForm  = () =>{
return(
    <form className="login-form">
    <div>
        <h1 className="login_title">Login</h1>
            <label htmlFor="username">Username </label><br/>
            <input 
            className="login-input"
            type="text" 
            id="username" 
            placeholder="Enter username"
       />
    </div>
    <br/>
    <div>
        <label htmlFor="password" className="label-login">Password </label><br/>
        <input 
            className="login-input"
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