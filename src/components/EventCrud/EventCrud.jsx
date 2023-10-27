import { useState, useEffect } from 'react';
import useEvents from '../../hooks/use-events'
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import useMentors from '../../hooks/use-mentors';
import useMentorEvents from '../../hooks/use-mentor-events';
import './EventCrud.css'

function EventCrud({activeEvent, onCreateEventClick, createEventOpen}) {

    const { events,  isEventsLoading, isEventsError } = useEvents();
    const { mentors, isMentorsLoading, isMentorsError } = useMentors();
    const { mentorevents, isMentorEventsLoading, isMentorEventsError } = useMentorEvents()

    // Selected mentors to add
    const [mentorsToAdd, setMentorsToAdd] = useState([])
    const onMentorsAdd = (mentorAddList) => {
        setMentorsToAdd(mentorAddList)
    }

    // Mentors currently linked to event that can be removed
    const [mentorsToRemove, setMentorsToRemove] = useState([])
    const onRemoveMentors = (mentorRemoveList) => {
        setMentorsToRemove(mentorRemoveList)
    }

    
    //TODO should be utils
    const parseDate=(str_date)=> {
        return new Date(Date.parse(str_date))
    }

    return (
        <div className='event-crud'>
            <div className='event-crud-details'>
                {activeEvent == "" ? 
                <p>Select an event to get started</p>
                :
                <div>
                {events.filter(event => (event.id == activeEvent)).map((eventData,key) => {
                    let formattedDateObj = parseDate(eventData.start_date)
                    return(<div key={key}>
                        <h3>{eventData.title}</h3>
                        <p>{formattedDateObj.toLocaleDateString()}</p>
                        </div>)
                })}
                </div>
                }
            </div>

            <div className='crud-elements'>

                <MentorEventsList   activeEvent={activeEvent}
                                    allMentorEvents={mentorevents} 
                                    isMentorEventsLoading= {isMentorEventsLoading}
                                    isMentorsLoading= {isMentorsLoading}
                                    allMentors={mentors}
                                    mentorsToAdd={mentorsToAdd} 
                                    mentorsToRemove={mentorsToRemove} 
                                    onRemoveMentors={onRemoveMentors}
                />

                <MentorList         activeEvent={activeEvent}
                                    allMentors={mentors}
                                    allMentorEvents={mentorevents} 
                                    mentorsToAdd={mentorsToAdd} 
                                    onMentorsAdd={onMentorsAdd} 
                                    mentorsToRemove={mentorsToRemove}  
                                    onRemoveMentors={onRemoveMentors} />
            </div>
        </div>
    )

} export default EventCrud