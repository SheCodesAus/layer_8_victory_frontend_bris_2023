import { useState } from 'react'
import EventsList from '../../components/EventList/EventList'
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm'
import EditEventForm from '../../components/EditEventsForm/EditEventsForm'
import EventCrud from '../../components/EventCrud/EventCrud'
import useAuth from '../../hooks/use-auth'
import useSelf from '../../hooks/use-self';
import './EventDashboard.css'



function EventDashboard() {

    const { auth, setAuth } = useAuth();
    const { self, isLoading, error } = useSelf();
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
            {auth.token && self?.is_staff ?
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
                <div className='forbidden'>
                    <h3>Sorry fair user, ye must be of staff origins to access this page</h3>
                    <div className='forbidden-lands'></div>
                    <div className='compass'><img src='/compass.png'></img></div>
                    {/* <a target="_blank" href="https://icons8.com/icon/kJqq7olgcblR/compass">Compass</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
                </div>
            }
        </>
    )
}

export default EventDashboard