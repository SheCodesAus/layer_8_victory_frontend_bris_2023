import { useState, useEffect } from 'react'
import EventsList from '../EventList/EventList'
import MentorList from '../MentorList/MentorList'
import MentorEventsList from '../MentorToEventsList/MentorToEventsList'
import CreateEventForm from '../CreateEventForm/CreateEventForm'
import EditEventForm from '../EditEventsForm/EditEventsForm'
import EventCrud from '../EventCrud/EventCrud'
import './EventDashboard.css'


function EventDashboard() {

    const [activeEvent, setActiveEvent] = useState("")
    const [createEventOpen, setCreateEventOpen] = useState("false")
    const [editEventOpen, setEditEventOpen] = useState("false")

    // Creating events
    const onCreateEventClick = (event) => {
        setCreateEventOpen(event)
    }

    // Editing events
    const onEditEventClick = (event) => {
        setEditEventOpen(event)
    }

    // Current event view
    const onChangeActiveEvent = (eventID) => {
        setActiveEvent(eventID)
    }

    return (
       
       
        <div className='dashboard'>

            <EventsList onEditEventClick={onEditEventClick} activeEvent={activeEvent} onChangeActiveEvent={onChangeActiveEvent} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen}/>

            {createEventOpen === "true" ?
                <CreateEventForm onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen} onChangeActiveEvent={onChangeActiveEvent} activeEvent={activeEvent} />
            :
                <>
                    {editEventOpen === "true" ?
                        <EditEventForm onEditEventClick={onEditEventClick} editEventOpen={editEventOpen} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen} onChangeActiveEvent={onChangeActiveEvent} activeEvent={activeEvent}  />
                    :
                        <>
                            {activeEvent != ''?
                                <EventCrud activeEvent={activeEvent} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen}
                                editEventOpen={editEventOpen} onEditEventClick={onEditEventClick}/>
                            :
                                <p>Find/click on an event, or create a new event</p>
                            
                            }
                        </>
                    }
                </>
            }
        </div>
      
    )
}

export default EventDashboard