import { useState, useEffect } from 'react';
import postMentorEvents from '../api/post-mentor-events';

export default function usePostMentorEvents() {

    const [mentorevents, setMentorEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    

    useEffect(() => {
        getMentorEvents()
        .then((mentorevents) => {
            setMentorEvents(mentorevents);
            setIsLoading(false);
            console.log("use effect here", isLoading, mentorevents)
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });

    }, []);

    return { mentorevents, isLoading, error };
}