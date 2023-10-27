import { useState } from 'react'
import EventsList from '../../components/EventList/EventList'
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm'
import EditEventForm from '../../components/EditEventsForm/EditEventsForm'
import EventCrud from '../../components/EventCrud/EventCrud'
import useAuth from '../../hooks/use-auth'
import NotFound404Page from '../../components/NotFound404Page/NotFound404Page'
import './EventDashboard.css'



function EventDashboard() {

    const { auth, setAuth } = useAuth();
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
        <>
            {auth.token && auth.is_staff ?
                <div className='dashboard'>

                    <EventsList onEditEventClick={onEditEventClick} activeEvent={activeEvent} onChangeActiveEvent={onChangeActiveEvent} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen} />

                    {createEventOpen === "true" ?
                        <CreateEventForm onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen} onChangeActiveEvent={onChangeActiveEvent} activeEvent={activeEvent} />
                        :
                        <>
                            {editEventOpen === "true" ?
                                <EditEventForm onEditEventClick={onEditEventClick} editEventOpen={editEventOpen} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen} onChangeActiveEvent={onChangeActiveEvent} activeEvent={activeEvent} />
                                :
                                <>
                                    {activeEvent != '' ?
                                        <EventCrud activeEvent={activeEvent} onCreateEventClick={onCreateEventClick} createEventOpen={createEventOpen}
                                            editEventOpen={editEventOpen} onEditEventClick={onEditEventClick} />
                                        :
                                        <p>Find/click on an event, or create a new event</p>

                                    }
                                </>
                            }
                        </>
                    }
                </div>
                :
                <div className='404'>
                    <NotFound404Page />
                </div>
            }
        </>
    )
}

export default EventDashboard