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

    const { mentorevents, isMentorEventsLoading, isMentorEventsError, refreshComp} = useMentorEvents()

    //const [stateBoi, updateStateBoi] = useState(null)

    // ideally these should be state from parent? Repeating API calls from MentorList and EventList
    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const {events, isEventsLoading, isEventsError } = useEvents()

    // useEffect(() => {
    //     updateStateBoi(mentorevents)
    //     console.log("state boi", stateBoi)
    // }, [mentorevents]
    // )


    
    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorsToAdd



    async function handleConfirm (event)  {
        console.log("ids to add ", mentorsToAdd)
        console.log("ids to remove ", mentorsToRemove)

        await Promise.all(mentorsToAdd.map((mentorID) => {
            if (mentorevents.filter(key => 
                (key.event_id == eventID && key.mentor_id == mentorID) )){
                    putMentorEvents(key.id, true)  //mentor previously assigned, update confirmed to true
                } else if (key.event_id == eventID) { // no previous assignment
                    postMentorEvents(eventID, mentorID)// create new record
                }

            
        }))

        await Promise.all(mentorsToRemove.map((id) => {
            putMentorEvents(id, true) // update assignment to unassigned by confirmed is false
        }))

        // fix this to just refresh assignment window
        //window.location.reload(true)
        //refreshComp

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

                {!isMentorEventsLoading && !isMentorsLoading && eventID?
                
                <>
                {mentorevents.filter(key => key.event_id == eventID && key.confirmed == false).length > 0 ?
            
                    <div>
                        {mentorevents.filter(key => (key.event_id == eventID && key.confirmed == false)).map((mentorData, key) => {
                            const mentorDetails = mentors.find(mentor => {return mentor.id === mentorData.mentor_id})
                            return ( 
                                    <div key={key}>
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
                                    <button value={removeMentorID} onClick={handleRemoveUndo}>Undo</button></div>)
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

