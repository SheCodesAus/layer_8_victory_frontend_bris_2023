import { useEffect, useState } from "react"
import useEvents from "../../hooks/use-events"
import useMentorEvents from "../../hooks/use-mentor-events"
import useMentors from "../../hooks/use-mentors"
import { useParams, useNavigate } from "react-router-dom"
import { convertLocalDateTime } from "../../utlities/convertLocalDateTime"
import './EventDetails.css'

function EventDetails () {
    let { eventid } = useParams()
    const { events, isEventsLoading, isEventsError } = useEvents()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError, refreshComp} = useMentorEvents()
    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    

    return (
        <div className="event-full-details">
        
        <div className="event-summary">

            {events.filter(key => (key.id == eventid )).map((eventData, key) => {

                const formattedStartDate = convertLocalDateTime(eventData.start_date)
                const formattedEndDate = convertLocalDateTime(eventData.end_date)

                return(
                    <div>
                        <h2>{eventData.title}</h2>
                        <h5>Start: {formattedStartDate}</h5>
                        <h5>End: {formattedEndDate}</h5>
                        <h5>Location: {eventData.location}</h5>
                </div>)

                })}
               
        </div>
        <div className="event-mentors-detail">
            <h3>Mentors</h3>
            {mentorevents.filter(key => (key.event_id == eventid && key.confirmed == true)).map((mentorData, key) => {

                const mentorDetails = mentors.find(mentor => (mentor.id === mentorData.mentor_id))

                    return ( 
                        <div key={key}>
                            {mentorDetails ? 
                                    <div>
                                        {!mentorDetails.rank? 
                                        <p> Mentor: <span className="span-bolder">{mentorDetails.first_name} {mentorDetails.last_name}</span> </p>
                                         :
                                        <p>{mentorDetails.rank} mentor: <span className="span-bolder">{mentorDetails.first_name} {mentorDetails.last_name} </span></p>
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