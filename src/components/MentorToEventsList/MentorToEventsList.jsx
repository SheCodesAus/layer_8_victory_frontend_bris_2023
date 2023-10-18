import { useState } from "react"
import useMentorEvents from "../../hooks/use-mentor-events"
import './MentorToEventsList.css'

function MentorEventsList({activeEvent, mentorListAssigned}) {

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()

    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorListAssigned


    return (
        <div className="mentor-event-list">
            <p>Mentors assigned to event {eventID}</p>

            {mentorevents.filter(key => key.event_id == eventID).length > 0 ?
            
            <ul>
            {mentorevents.filter(key => key.event_id == eventID).map((mentorData, key) => {
                // const mentorDetails = mentors.find(mentor => {
                //     return mentor.id === mentorData.mentor_id
                // })
                return(<li>{mentorData.mentor_id}</li>)//(<li key={key}>Mentor: {mentorDetails.username}</li>)
            })}
            </ul>
            : <ul><li>No confirmed mentors</li></ul>

            }
                      

            {
            mentorIDs.length > 0 ?
             <div>
            <p>Tentative mentors </p>
            <ul>
                {mentorIDs.map((mentorIDData, key) => {
                    return(<li key={key}>{mentorIDData}</li>)
                })} 
            </ul>
            </div>
            : <ul><li>Add some mentors</li></ul>
            }
                   

            <button>Confirm</button>

        </div>
    )

}
export default MentorEventsList

