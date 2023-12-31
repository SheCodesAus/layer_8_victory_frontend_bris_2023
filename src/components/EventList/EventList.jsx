import { useState, setState} from 'react';
import useEvents from '../../hooks/use-events'
import { useNavigate } from 'react-router-dom';
import { convertLocalDateTime } from '../../utlities/convertLocalDateTime';
import './EventList.css'


function EventsList({activeEvent, onChangeActiveEvent, createEventOpen, onCreateEventClick, editEventOpen, onEditEventClick}) {

    const navigate = useNavigate()

    const { events,  isEventsLoading, isEventsError } = useEvents();

    const [searchTerm, setSearchTerm] = useState("")

    if (isEventsLoading){
        return<div>Events loading...</div>
    }

    if (isEventsError){
        return<div>{isEventsError.message}</div>
    }

    const handleAssignMentors = (event) => {
        console.log(event.target.value)
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

    const handleEventClick = (event) => {

        let eventid = event.target.value
        navigate(`/events/${eventid}`)
    }


    return (
        <div className='event-list'>
            <h3>Events List</h3>
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

                    let formattedDate = convertLocalDateTime(eventData.start_date)
                    return(
                        <div key={key} className='event-detail'>
                            <div className='event-info' >
                                <button className='event-button' onClick={handleEventClick} value={eventData.id}>
                                <p>{eventData.title}</p>
                                <p>{formattedDate} </p>
                                <p>{eventData.location}</p>
                                </button>
                            </div>
                            <div className='action-buttons'>
                                <button className={eventData.is_published ? "assign" : "hidden"} onClick={handleAssignMentors} value={eventData.id}>Assign Mentors</button>
                                <button className='edit-event' onClick={handleEditEventClick} value={eventData.id}>Edit Event</button>
                            </div>
                        </div>)
                })}
                </ul>
            </div>
        </div>
        )
}

export default EventsList