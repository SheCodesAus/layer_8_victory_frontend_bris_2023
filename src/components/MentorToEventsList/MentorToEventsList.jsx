import { useState } from "react"
import useMentorEvents from "../../hooks/use-mentor-events"
import './MentorToEventsList.css'

function MentorEventsList({activeEvent, onChangeActiveEvent}) {

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()
    const eventID = activeEvent

    return (
        <div className="mentor-event-list">
            <p>Mentors assigned to event {eventID}</p>
            <ul>
            {mentorevents.filter(key => key.event_id == eventID).map((mentorData, key) => {
                // const mentorDetails = mentors.find(mentor => {
                //     return mentor.id === mentorData.mentor_id
                // })
                return(<li>{mentorData.mentor_id}</li>)//(<li key={key}>Mentor: {mentorDetails.username}</li>)
            })}
            </ul>
        </div>
    )

}
export default MentorEventsList

