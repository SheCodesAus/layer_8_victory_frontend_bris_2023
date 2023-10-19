import { useEffect, useState } from "react"
import useMentorEvents from "../../hooks/use-mentor-events"
import postMentorEvents from "../../../api/post-mentor-events"
import putMentorEvents from "../../../api/put-mentor-events"
import './MentorToEventsList.css'
import useMentors from "../../hooks/use-mentors"
import useEvents from "../../hooks/use-events"


function MentorEventsList({activeEvent, 
    mentorsToAdd, 
    onRemoveMentors, 
    mentorsToRemove,
    currentMentors,
    onCurrentMentorsChange}) {

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()

    // ideally these should be state from parent? Repeating API calls from MentorList and EventList
    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const {events, isEventsLoading, isEventsError } = useEvents()


    
    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorsToAdd



    async function handleConfirm (event)  {
        console.log("ids to add ", mentorsToAdd)
        console.log("ids to remove ", mentorsToRemove)

        await Promise.all(mentorsToAdd.map((mentorID) => {
            postMentorEvents(eventID, mentorID)
        }))

        await Promise.all(mentorsToRemove.map((id) => {
            putMentorEvents(id, true)
        }))

        // fix this to just refresh assignment window
        window.location.reload(true)

    }


    const handleRemoveList = (event) => {
        console.log(event.target.value)
        // get ids of mentors to remove/update
        let index = mentorsToRemove.indexOf(event.target.value)

        console.log(index)

        if (index == -1) {
            onRemoveMentors([...mentorsToRemove, event.target.value])
        } 
    }

    return (
        <div className="mentor-event-list">
    
        <div className="current">Currently Assigned Mentors</div>
            <div className="assigned-mentors">


                {mentorevents.filter(key => key.event_id == eventID && key.is_deleted == false).length > 0 ?
            
                    <div>
                        {mentorevents.filter(key => (key.event_id == eventID && key.is_deleted == false)).map((mentorData, key) => {
                            const mentorDetails = mentors.find(mentor => {return mentor.id === mentorData.mentor_id})
                            return ( 
                                    <div>
                                        {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})
                                        <button className='remove' onClick={handleRemoveList} value={mentorData.id}>Remove</button>
                                    </div>
                                    )
                            })
                        }
                    </div>
                : 
                <div>No mentors currently assigned</div>
                }
            </div>

                
            <div className="mentor-changes-title">Mentor Changes</div>

            <div className="mentor-changes">   
                <div className="add-mentors">
                    <p>Adding</p>
                    {mentorIDs.length > 0 ?
                        <div>
                        {mentorIDs.map((mentorIDData, key) => {
                            const mentorDetails = mentors.find(mentor => {return mentor.id == mentorIDData})
                            return(<div className="mentors" key={key}> {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})</div>)
                        })} 
                    </div>
                    : 
                    <></>
                    }
                </div>

                <div className="remove-mentors">
                    <p>Removing</p>
                    {mentorsToRemove.map((removeMentorID, key) => {
                        const mentorDetails = mentors.find(mentor => {
                            return mentor.id === mentorevents.filter(key=>key.id == removeMentorID)[0].mentor_id
                            })
                            return(<div className="mentors-remove">{mentorDetails.first_name} {mentorDetails.last_name}</div>)
                        })} 
                </div>

            </div> 
            <div className="confirm-div"><button className="confirm" onClick={handleConfirm}>Confirm</button></div>
            

        </div>
    )

}
export default MentorEventsList

