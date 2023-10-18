import { useState, useEffect } from 'react';
import EventsList from '../EventList/EventList';
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import './EventCrud.css'

function EventCrud({activeEvent}) {

    const [mentorListAssigned, setMentorListAssigned] = useState([])

    const onChangeMentorList = (mentorList) => {
        setMentorListAssigned(mentorList)
    }

    return (
        <div className='event-crud'>
             <MentorEventsList activeEvent={activeEvent} mentorListAssigned={mentorListAssigned}/>
            <MentorList mentorListAssigned={mentorListAssigned} onChangeMentorList={onChangeMentorList} />
        </div>
    )

} export default EventCrud