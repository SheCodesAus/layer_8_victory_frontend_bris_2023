import { useEffect, useState } from "react"
import postMentorEvents from "../../api/post-mentor-events"
import putMentorEvents from "../../api/put-mentor-events"
import './MentorToEventsList.css'



function MentorEventsList({ activeEvent,
    allMentorEvents,
    allMentors,
    isMentorEventsLoading,
    isMentorsLoading,
    mentorsToAdd,
    onMentorsAdd,
    onRemoveMentors,
    mentorsToRemove
}) {

    // Set the event id from parent state
    const eventID = activeEvent

    // Get ids from interaction with mentor list
    const mentorIDs = mentorsToAdd

    async function handleConfirm(event) {
        console.log("adding ", mentorsToAdd)
        console.log("removing ", mentorsToRemove)

        const mentorsPUTRequest = []
        const mentorsPOSTRequest = []
        const mentorsPUTRemoveRequest = []

        let mentor = ""

        for (mentor in mentorsToAdd) {

            let mentorCheck = allMentorEvents.find(elm =>
                elm.mentor_id == mentorsToAdd[mentor] &&
                elm.event_id == eventID &&
                !elm.confirmed)

            if (mentorCheck) {
                mentorsPUTRequest.push(mentorCheck.id)
            } else {
                mentorsPOSTRequest.push(mentorsToAdd[mentor])
            }
        }

        for (mentor in mentorsToRemove) {

            let mentorCheck = allMentorEvents.find(elm =>
                elm.mentor_id == mentorsToRemove[mentor] &&
                elm.event_id == eventID
                )

            if (mentorCheck) {
                mentorsPUTRemoveRequest.push(mentorCheck.id)
            } 
        }

        //mentor previously assigned, update confirmed to true
        await Promise.all(mentorsPUTRequest.map((mentorID) => {
            putMentorEvents(mentorID, "true", "true")
        }))

        //mentor not previously assigned, create new
        await Promise.all(mentorsPOSTRequest.map((mentorID) => {

            postMentorEvents(eventID, mentorID, "true", "true")
        }))

        // mentor to be removed, put request
        await Promise.all(mentorsPUTRemoveRequest.map((id) => {
            putMentorEvents(id, "false", "false")
        }))

        //TODO fix this to just refresh assignment window
        window.location.reload(true)
    }


    return (
        <div className="mentor-event-list">

            <h3 id="current-event">Event Mentors</h3>
            <div className="event-mentors">
                
                {!isMentorEventsLoading && !isMentorsLoading && eventID ?
                    <>
                        {allMentorEvents.filter(key => key.event_id == eventID).length > 0 ?

                            <div className="event-mentors-confirmed-container">

                                {allMentorEvents.filter(key => (key.event_id == eventID)).map((mentorData, key) => {
                                    const mentorDetails = allMentors.find(mentor => (mentor.id === mentorData.mentor_id ))
                                    console.log(key)
                                    return (

                                        <div key={key}>
                                            {mentorData.confirmed || mentorData.available  ?
                                                <div className="mentors-confirmed">
                                                    {mentorDetails?.first_name} {mentorDetails?.last_name} ({mentorDetails?.rank})
                                                </div>
                                                : <></>}
                                        </div>
                                    )
                                })
                                }
                            </div>
                            :
                            <div>No mentors currently assigned</div>
                        }
                        
                        <div className="mentor-changes-container">
                        <h3 id ="mentor-changes-title">Mentor Changes</h3>

                        <div className="mentor-changes">
                            <div className="add-mentors">
                                <p>Adding</p>
                                {mentorIDs.length > 0 ?
                                    <div>
                                        {mentorIDs.map((mentorIDData, key) => {
                                            const mentorDetails = allMentors.find(mentor => { return mentor.id == mentorIDData })
                                            return (<div className="mentors-added" key={key}> {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})</div>)
                                        })}
                                    </div>
                                    :
                                    <></>
                                }
                            </div>

                            <div className="remove-mentors">
                                <p>Removing</p>
                                {mentorsToRemove.length > 0 ?
                                    <div>
                                        {mentorsToRemove.map((mentorRemoveID, key) => {
                                            const mentorDetails = allMentors.find(mentor => { return mentor.id == mentorRemoveID })
                                            return (<div className="mentors-removed" key={key}> {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})</div>)
                                        })}
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        </div>
                    </>
                    :
                    <>Loading mentor details</>
                }
            </div>
            <div className="confirm-div"><button className="confirm" onClick={handleConfirm}>Confirm</button></div>
        </div>
    )
}
export default MentorEventsList

