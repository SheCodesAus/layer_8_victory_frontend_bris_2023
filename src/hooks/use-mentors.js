import { useState, useEffect } from 'react';
import getMentors from '../../api/get-mentors';

export default function useMentors() {

    const [mentors, setMentors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

       

    useEffect(() => {
        getMentors()
        .then((mentors) => {
            setMentors(mentors);
            setIsLoading(false);
           
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });

    }, []);

    return { mentors, isLoading, error };
}