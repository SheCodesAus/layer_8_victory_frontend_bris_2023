import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post_login";
import useAuth from "../../hooks/use-auth";
import Button from "../Buttton/Button";
import "./LoginForm.css";


const LoginForm  = () =>{
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState
    ({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password,
                ).then((response) => {
                    window.localStorage.setItem("token", response.token);
                  
                    setAuth({
                        token: response.token,
                    });
                    navigate("/events");
                });
        }
    };

return(
    <form className="login-form">
    <div>
        <h1 className="login_title">Login</h1>

            <label htmlFor="username" className="label-login">Username </label><br/>
            <input 
            className="login-input"
            type="text" 
            id="username" 
            placeholder="Username"
            onChange={handleChange}
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
            onChange={handleChange}
        />      
    </div>
    <br/>
    <Button text={"Login"} btnClass = "btn-info " onClick={handleSubmit}/>
  
   
</form> 
)
}

export default LoginForm