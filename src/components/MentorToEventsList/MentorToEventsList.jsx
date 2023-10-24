import { useEffect, useState } from "react"
import useMentorEvents from "../../hooks/use-mentor-events"
import postMentorEvents from "../../api/post-mentor-events"
import putMentorEvents from "../../api/put-mentor-events"
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
    //const {events, isEventsLoading, isEventsError } = useEvents()

    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorsToAdd
    
    async function handleConfirm (event)  {
        console.log("ids to add ", mentorsToAdd)
        console.log("ids to remove ", mentorsToRemove)
        
        const mentorsPUTRequest = []
        const mentorsPOSTRequest = []
        let mentor = ""

        for (mentor in mentorsToAdd) {

            let mentorCheck = mentorevents.find(elm => 
                elm.mentor_id == mentorsToAdd[mentor] &&
                elm.event_id == eventID &&
                !elm.confirmed)

            if (mentorCheck) {
                mentorsPUTRequest.push(mentorCheck.id)
            } else {
                mentorsPOSTRequest.push(mentorsToAdd[mentor])
            }
        }

        //mentor previously assigned, update confirmed to true
        await Promise.all(mentorsPUTRequest.map((mentorID) => {
            console.log("put ", mentorID)
            putMentorEvents(mentorID, "true")
        }))

        //mentor not previously assigned, create new
        await Promise.all(mentorsPOSTRequest.map((mentorID) => {
            console.log("post",eventID, mentorID )
            postMentorEvents(eventID, mentorID, "true")  
        }))

        // mentor to be removed, put request
        await Promise.all(mentorsToRemove.map((id) => {
            console.log('put -set to remove/ false')
            putMentorEvents(id, "false") 
        }))

        // fix this to just refresh assignment window
        window.location.reload(true)
    }

    const handleRemoveUndo = (event) => {
        let index = mentorsToRemove.indexOf(event.target.value)
        let unRemove = [...mentorsToRemove]

        if (index !== -1) {
            unRemove.splice(index,1)
        } else {
            unRemove
        }
        onRemoveMentors(unRemove)
    }


    const handleRemoveList = (event) => {
        // get ids of mentors to remove/update
        let index = mentorsToRemove.indexOf(event.target.value)
        if (index == -1) {
            onRemoveMentors([...mentorsToRemove, event.target.value])
        }
        
    }

    return (
        <div className="mentor-event-list">
    
        <div className="current">Currently Assigned Mentors</div>
            <div className="assigned-mentors">

                {!isMentorEventsLoading && !isMentorsLoading && eventID ?
                <>
                {mentorevents.filter(key => key.event_id == eventID && key.confirmed == true).length > 0 ?
            
                    <div>
                        {mentorevents.filter(key => (key.event_id == eventID && key.confirmed == true)).map((mentorData, key) => {
                            const mentorDetails = mentors.find(mentor => (mentor.id === mentorData.mentor_id))
                            return ( 
                                    <div key={key}>
                                        {mentorDetails ? 
                                        <div className="mentors-confirmed">
                                            {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})
                                        <button className='assigning' onClick={handleRemoveList} value={mentorData.id}>Remove</button></div>
                                        : <div>Loading</div>}
                                    </div>
                                    )
                            })
                        }
                    </div>

                    
                : 
                    <div>No mentors currently assigned</div>
                }
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
                                    return(<div className="mentors-remove">{mentorDetails.first_name} {mentorDetails.last_name}
                                    <button className="assigning" value={removeMentorID} onClick={handleRemoveUndo}>Undo</button></div>)
                                })} 
                        </div>
                    </div> 
                </>
                :
                <>Loading details</>
                }
            </div>
            <div className="confirm-div"><button className="confirm" onClick={handleConfirm}>Confirm</button></div>
            

        </div>
    )

}
export default MentorEventsList

