import { useState, useEffect } from 'react';
import getMentorEvents from '../../api/get-mentor-events';

export default function useMentorEvents() {

    const [mentorevents, setMentorEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [refreshData, setRefreshData] = useState();

    // If doesn't work google how do I force refresh/rerender of a compoent/state
   const  refreshComp = () => (setRefreshData({}) )
    

    // useEffect(() => {
    //     getMentorEvents()
    //     .then((mentorevents) => {
    //         setMentorEvents(mentorevents);
    //         setIsLoading(false);
    //     })
    //     .catch((error) => {
    //         setError(error);
    //         setIsLoading(false);
    //     });

    // }, [refreshData]);

    useEffect(() => {
        getMentorEvents()
        .then((mentorevents) => {
            setMentorEvents(mentorevents);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });

    }, [refreshData]);


    // return { mentorevents, isLoading, error, refreshComp };
    return { mentorevents, isLoading, error, refreshComp };
}