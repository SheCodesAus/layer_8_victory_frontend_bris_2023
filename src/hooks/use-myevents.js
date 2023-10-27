import { useState,useEffect } from "react";
import getMyEvents from "../api/get-my-events";

export default function useMyEvents() {

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] =useState(true);
    const [error, setError] =useState();

    useEffect(() =>{
        getMyEvents()      
        .then((events) =>{
            setEvents(events);
            setIsLoading(false);
        })      
            .catch((error) =>{
                setError(error);
                setIsLoading(false);
            });}, []);
    
    return [ events, isLoading, error ];

    }