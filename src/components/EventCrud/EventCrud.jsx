import { useState, useEffect } from 'react';
import EventsList from '../EventList/EventList';
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import './EventCrud.css'

function EventCrud({activeEvent}) {

    const [mentorsToAdd, setMentorsToAdd] = useState([])

    const onMentorsAdd = (mentorAddList) => {
        setMentorsToAdd(mentorAddList)
    }

    const [mentorsToRemove, setMentorsToRemove] = useState([])

    const onRemoveMentors = (mentorRemoveList) => {
        setMentorsToRemove(mentorRemoveList)
    }

    const [currentMentors, setCurrentMentors] = useState([])

    const onCurrentMentorsChange = (currentMentorsList) => {
        setCurrentMentors(currentMentorsList)
    }


    return (
        <div className='event-crud'>
            <MentorEventsList   activeEvent={activeEvent} 
                                mentorsToAdd={mentorsToAdd} 
                                mentorsToRemove={mentorsToRemove} 
                                onRemoveMentors={onRemoveMentors}
                                currentMentors={currentMentors}
                                onCurrentMentorsChange={onCurrentMentorsChange}/>

            <MentorList         mentorsToAdd={mentorsToAdd} 
                                onMentorsAdd={onMentorsAdd} 
                                mentorsToRemove={mentorsToRemove}  
                                onRemoveMentors={onRemoveMentors} />
        </div>
    )

} export default EventCrud