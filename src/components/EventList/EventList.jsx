import { useState, setState} from 'react';
import useEvents from '../../hooks/use-events'
import EventCard from '../Cards/EventCard'
import './EventList.css'


function EventsList({activeEvent, onChangeActiveEvent}) {

    const { events,  isEventsLoading, isEventsError } = useEvents(); 

    // const [activeEvent, setActiveEvent] = useState("")

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
            
            {/* <input className='search-box'
                type='text' 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder='Find an event'>
            </input> */}
    
            <div>
                <ul>
                {events.sort((a,b) => {
                 return b.start_date - a.start_date
                }).filter(o => o.title.includes(searchTerm)).map((eventData, key) => {

                    const formattedDateObj = new Date(eventData.start_date)

                    return(
                    <li key={key}>
                        {eventData.title} : {formattedDateObj.getDay()}/{formattedDateObj.getMonth()}/{formattedDateObj.getFullYear()}
                    <button onClick={handleAssignMentors} value={eventData.id}>Assign Mentors</button> 
                    </li>
                    )
                })}
                </ul>

            </div>



            </div>
    
        )

}

export default EventsList