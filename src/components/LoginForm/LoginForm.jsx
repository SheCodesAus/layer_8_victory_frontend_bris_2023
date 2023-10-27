import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post_login";
import useAuth from "../../hooks/use-auth";
import Button from "../Buttton/Button";
import "./LoginForm.css";


const LoginForm  = () =>{
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth()
    const [errorMessage, setErrorMessage] = useState("");
    const [formIsInvalid, setFormIsInvalid] = useState("");
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
                        is_staff:""
                    });
                    navigate("/profile");
                })
                .catch((error) => {
                    setErrorMessage(`${[error.message]} \n`);
                  });
            
        }
        else{
            setFormIsInvalid("Invalid Username or Password.");
       
        }
    };

return(
    <>
    <form className="login-form">
    <div>
        <h1 className="login_title">Login</h1>

            <label htmlFor="username" className="label-login">Username </label><br/>
            <input 
            className="login-input"
            type="text" 
            id="username" 
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
            onChange={handleChange}
        />      
    </div>
    <br/>
    <Button text={"Login"} btnClass = "btn-info " onClick={handleSubmit}/>
   
    <p className="error-message">{errorMessage}</p>
      <sub className={errorMessage ? "" : "hidden"}>Please check your username and password.</sub>
      <sub className={errorMessage ? "" : "hidden"}>* Username and password are case sensitive.</sub>
      <p>{formIsInvalid}</p>
</form> 

 </>
)
}

export default LoginForm