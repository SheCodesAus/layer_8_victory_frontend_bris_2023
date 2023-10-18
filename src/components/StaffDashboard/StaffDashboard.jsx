import { useState, useEffect } from 'react';
import EventsList from '../EventList/EventList';
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import './StaffDashboard.css'


function StaffDashboard() {

    const [activeEvent, setActiveEvent] = useState("")

    const onChangeActiveEvent = (eventID) => {
        setActiveEvent(eventID)
    }

    

    
    console.log(activeEvent)


    // const aggregate = (arr,on, who) => {
    //     const agg = arr.reduce((a,b) => {
    //         const onValue = b[on]
    //         const whoValue = b[who]

    //         if(a[onValue]) {
    //             a[onValue] = {
    //                 [on]: onValue,
    //                 [who]: [...a[onValue][who], whoValue]
    //             }
    //         }
    //         else {
    //             a[onValue] ={
    //                 [on]: onValue,
    //                 [who]:[whoValue]
    //             }
    //         }
    //         return a;
    //     }, {})
    //     return Object.values(agg)
    // }

    return (
        <div className='dashboard'>

            <EventsList activeEvent={activeEvent} onChangeActiveEvent={onChangeActiveEvent}/>
            <MentorEventsList activeEvent={activeEvent}/>
            <MentorList />
        </div>
    
        )

}

export default StaffDashboard