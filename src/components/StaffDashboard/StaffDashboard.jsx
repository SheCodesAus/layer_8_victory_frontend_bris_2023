import { useState, useEffect } from 'react';
import EventsList from '../EventList/EventList';
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'

import EventCrud from '../EventCrud/EventCrud'
import './StaffDashboard.css'


function StaffDashboard() {

    const [activeEvent, setActiveEvent] = useState("")

    const onChangeActiveEvent = (eventID) => {
        setActiveEvent(eventID)
    }


    

    return (
        <div className='dashboard'>

           <EventsList activeEvent={activeEvent} onChangeActiveEvent={onChangeActiveEvent}/>

           {activeEvent != ''?
           <EventCrud activeEvent={activeEvent}  />
           :
           <p>Get Started with an event</p>
            }
           
           
        </div>
    
        )

}

export default StaffDashboard