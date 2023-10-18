import { useState } from "react"
import useMentorEvents from "../../hooks/use-mentor-events"

import './MentorToEventsList.css'

function MentorEventsList({activeEvent, 
    mentorsToAdd, 
    onRemoveMentors, 
    mentorsToRemove,
    currentMentors,
    onCurrentMentorsChange}) {

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()

    
    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorsToAdd


    const handleConfirm = (event) => {

    }


    const handleRemoveList = (event) => {

        onRemoveMentors([...mentorsToRemove, event.target.value])
        

    }

    return (
        <div className="mentor-event-list">
            <p>Currently Assigned Mentors to event {eventID}</p>

            {mentorevents.filter(key => key.event_id == eventID).length > 0 ?
            
            <ul>
            {mentorevents.filter(key => key.event_id == eventID).map((mentorData, key) => {
                // const mentorDetails = mentors.find(mentor => {
                //     return mentor.id === mentorData.mentor_id
                // })
                return( <div>
                             <li key={key}>{mentorData.mentor_id}</li>
                             <button onClick={handleRemoveList} value={mentorData.mentor_id}>Remove Mentor</button>
                        </div>
                    )//(<li key={key}>Mentor: {mentorDetails.username}</li>)
            })}
            </ul>
            : <ul><li>No mentors currently assigned</li></ul>

            }
            <p className="mentor-changes-title">Mentor Changes</p>

            <div className="mentor-changes">   
                

                <div className="add-mentors">
                    <p>Mentors to Add</p>
                    {
                    mentorIDs.length > 0 ?
                    <div>

                    <ul>
                        {mentorIDs.map((mentorIDData, key) => {
                            return(<li key={key}>{mentorIDData}</li>)
                        })} 
                    </ul>
                    </div>
                    : <></>
                    }
                    
                </div>

                <div className="remove-mentors">
                    <p>Mentors to Remove</p>

                    <ul>
                        {mentorsToRemove.map((removeMentorID, key) => {
                            return(<li key={key}>{removeMentorID}</li>)
                        })} 
                    </ul>

                </div>

            </div> 

            <button className="confirm">Confirm</button>

        </div>
    )

}
export default MentorEventsList

