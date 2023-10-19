import { useState, setState} from 'react';
import useEvents from '../../hooks/use-events'
import EventCard from '../Cards/EventCard'
import './EventList.css'


function EventsList({activeEvent, onChangeActiveEvent}) {

    const { events,  isEventsLoading, isEventsError } = useEvents();
    console.log(events)

    const [searchTerm, setSearchTerm] = useState("")

   if (isEventsLoading){
        return<div>Events loading...</div>
    }

    if (isEventsError){
        return<div>{isEventsError.message}</div>
    }

    const handleAssignMentors = (event) => {
               
        onChangeActiveEvent(event.target.value)
        
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

            <button className='create-event'>Create an event</button>
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
                                 <button className='edit-event'>Edit Event</button>
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