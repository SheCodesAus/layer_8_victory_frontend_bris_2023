import { useState, setState} from 'react';
import useEvents from '../../hooks/use-events'
import EventCard from '../Cards/EventCard'
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import EditEventForm from '../EditEventsForm/EditEventsForm';
import './EventList.css'


function EventsList({activeEvent, onChangeActiveEvent, createEventOpen, onCreateEventClick, editEventOpen, onEditEventClick}) {

    const { events,  isEventsLoading, isEventsError } = useEvents();

    const [searchTerm, setSearchTerm] = useState("")

   if (isEventsLoading){
        return<div>Events loading...</div>
    }

    if (isEventsError){
        return<div>{isEventsError.message}</div>
    }

    const handleAssignMentors = (event) => {
               
        onChangeActiveEvent(event.target.value)
        onCreateEventClick("false")
        onEditEventClick("false")
        
    }

    const handleCreateEventClick = (event) => {
        onCreateEventClick(event.target.value)
        onEditEventClick("false")
    }

    const handleEditEventClick = (event) => {

        onChangeActiveEvent(event.target.value)
        
        onEditEventClick("true")
        onCreateEventClick("false")
    }

    const handleChange = e => setSearchTerm(e.target.value)

    return (
        <div className='event-list'>
            <p>Events List</p>
            <div className='event-top'>
            <input className='search-box'
                type='text' 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder='Find an event'>
            </input>

            <button className='create-event' onClick={handleCreateEventClick} value="true">Create an event</button>


            </div>


            <div>
                <ul>
                {events.sort((a,b) => {
                 return b.start_date - a.start_date
                }).filter(o => o.title.includes(searchTerm)).map((eventData, key) => {

                    
                    return(
                        <div className='event-detail'>
                            <EventCard key={key} eventData={eventData} />
                            <div className='action-buttons'>
                                <button className='assign' onClick={handleAssignMentors} value={eventData.id}>Assign Mentors</button>
                                 <button className='edit-event' onClick={handleEditEventClick} value={eventData.id}>Edit Event</button>
                             </div>
                       {/* {eventData.id}    <button onClick={handleAssignMentors} value={eventData.id}>Assign Mentors</button> */}
                        </div>)
                })}
                </ul>

            </div>


            </div>
    
        )

}

export default EventsList