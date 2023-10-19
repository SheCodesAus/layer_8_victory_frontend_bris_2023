import { useState, useEffect } from 'react';
import EventsList from '../EventList/EventList';
import useEvents from '../../hooks/use-events'
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import './EventCrud.css'

function EventCrud({activeEvent}) {

    const { events,  isEventsLoading, isEventsError } = useEvents();

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

            <div className='event-crud-details'>
                
                {activeEvent == "" ? 
            
                <p>Select an event to get started</p>
                
                :
                <div>
                {events.filter(event => (event.id == activeEvent)).map((eventData,key) => {
                    const formattedDateObj = new Date(eventData.start_date)
                    return(<div key={key}>
                        
                        <p>Title: {eventData.title}</p>
                        <p>Date: {formattedDateObj.getDay()} / {formattedDateObj.getMonth()} / {formattedDateObj.getFullYear()}</p>
                        </div>)
                })}
                </div>
                }
            </div>

            <div className='crud-elements'>
                <MentorEventsList   activeEvent={activeEvent} 
                                    mentorsToAdd={mentorsToAdd} 
                                    mentorsToRemove={mentorsToRemove} 
                                    onRemoveMentors={onRemoveMentors}
                                    currentMentors={currentMentors}
                                    onCurrentMentorsChange={onCurrentMentorsChange}/>

                <MentorList         activeEvent={activeEvent}
                                    mentorsToAdd={mentorsToAdd} 
                                    onMentorsAdd={onMentorsAdd} 
                                    mentorsToRemove={mentorsToRemove}  
                                    onRemoveMentors={onRemoveMentors} />
            </div>
        </div>
    )

} export default EventCrud