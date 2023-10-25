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
                elm.event_id == eventID &&
                elm.confirmed)

            if (mentorCheck) {
                mentorsPUTRemoveRequest.push(mentorCheck.id)
            } 
        }

        //mentor previously assigned, update confirmed to true
        await Promise.all(mentorsPUTRequest.map((mentorID) => {
            console.log("put ", mentorID)
            putMentorEvents(mentorID, "true")
        }))

        //mentor not previously assigned, create new
        await Promise.all(mentorsPOSTRequest.map((mentorID) => {
            console.log("post", eventID, mentorID)
            postMentorEvents(eventID, mentorID, "true")
        }))

        // mentor to be removed, put request
        await Promise.all(mentorsPUTRemoveRequest.map((id) => {
            console.log('put -set to remove/ false', id)
            putMentorEvents(id, "false")
        }))

        //TODO fix this to just refresh assignment window
        window.location.reload(true)
    }


    return (
        <div className="mentor-event-list">

            <div className="current"><h3>Currently Confirmed Mentors for Event</h3></div>
            <div className="assigned-mentors">

                {!isMentorEventsLoading && !isMentorsLoading && eventID ?
                    <>
                        {allMentorEvents.filter(key => key.event_id == eventID && key.confirmed == true).length > 0 ?

                            <div>

                                {allMentorEvents.filter(key => (key.event_id == eventID && key.confirmed == true)).map((mentorData, key) => {
                                    const mentorDetails = allMentors.find(mentor => (mentor.id === mentorData.mentor_id))
                                    return (

                                        <div key={key}>
                                            {mentorDetails ?
                                                <div className="mentors-confirmed">
                                                    {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})
                                                </div>
                                                : <div>Loading</div>}
                                        </div>
                                    )
                                })
                                }
                            </div>
                            :
                            <div>No mentors currently assigned</div>
                        }
                        <div className="mentor-changes-title"><h3>Mentor Changes</h3></div>

                        <div className="mentor-changes">
                            <div className="add-mentors">
                                <p>Adding</p>
                                {mentorIDs.length > 0 ?
                                    <div>
                                        {mentorIDs.map((mentorIDData, key) => {
                                            const mentorDetails = allMentors.find(mentor => { return mentor.id == mentorIDData })
                                            return (<div className="mentors" key={key}> {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})</div>)
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
                                            return (<div className="mentors" key={key}> {mentorDetails.first_name} {mentorDetails.last_name} ({mentorDetails.rank})</div>)
                                        })}
                                    </div>
                                    :
                                    <></>
                                }
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

