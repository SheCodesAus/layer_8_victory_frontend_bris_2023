import { useEffect, useState } from "react"
import useEvents from "../../hooks/use-events"
import useMentorEvents from "../../hooks/use-mentor-events"
import useMentors from "../../hooks/use-mentors"
import { useParams } from "react-router-dom"
import './EventDetails.css'

function EventDetails () {

    const { events, isEventsLoading, isEventsError } = useEvents()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError, refreshComp} = useMentorEvents()
    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const { eventid } = useParams()


    console.log(eventid)
    

    return (
        <div className="event-full-details">
        
        <div className="event-summary">

            {events.filter(key => (key.id == eventid )).map((eventData, key) => {
                const formattedStartDate = new Date(eventData.start_date)
                const formattedEndDate = new Date(eventData.end_date)
                return(
                    <div>
                        <h2>{eventData.title}</h2>
                        <h5>Start: {formattedStartDate.getDay()} / {formattedStartDate.getMonth()} / {formattedStartDate.getFullYear()}</h5>
                        <h5>End: {formattedEndDate.getDay()} / {formattedEndDate.getMonth()} / {formattedEndDate.getFullYear()}</h5>
                        <h5>Location: {eventData.location}</h5>
                </div>)

                })}
               
        </div>
        <div className="event-mentors">
            <h3>Mentors</h3>
            {mentorevents.filter(key => (key.event_id == eventid && key.confirmed == true)).map((mentorData, key) => {

                const mentorDetails = mentors.find(mentor => (mentor.id === mentorData.mentor_id))

                    return ( 
                        <div key={key}>
                            {mentorDetails ? 
                                    <div>
                                        {!mentorDetails.rank? 
                                        <p> Mentor: {mentorDetails.first_name} {mentorDetails.last_name} </p>
                                         :
                                        <p>{mentorDetails.rank} mentor: {mentorDetails.first_name} {mentorDetails.last_name} </p>
                                        }
                                    </div>
                                : 
                                <div>Loading</div>}
                                        
                            </div>
                            )
                })
            }
        </div>

        </div>

    )


} 
export default EventDetails