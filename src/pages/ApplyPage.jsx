import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/use-auth";
import ApplyForm from "../components/ApplyForm/ApplyForm";

const ApplyPage = () =>{
    const { auth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (auth.token) {
        navigate(`/events`);
      }
    }, []);
   
    return(

       <div>
       <ApplyForm/>
       </div>
    )
}

export default ApplyPage