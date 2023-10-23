import { useState,useEffect } from "react";
import postCreateAccount from "../api/post_create_account";

export default function useUsers() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] =useState(true);
    const [error, setError] =useState();

    useEffect(() =>{
        postCreateAccount()      
        .then((users) =>{
            setUsers(users);
            setIsLoading(false);
        })      
            .catch((error) =>{
                setError(error);
                setIsLoading(false);
            });}, []);
    
    return{ users, isLoading, error };

    }