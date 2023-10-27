import React from "react";
import { useState } from "react";
import './MentorCard.css'

const MentorCard = ({
    mentorDataDetails,
    allMentorEvents,
    mentorsToAdd,
    onMentorsAdd,
    mentorsToRemove,
    onRemoveMentors,
    activeEvent }) => {

    const [assignedStatus, setAssignedStatus] = useState("Assign")
    const [removedStatus, setRemovedStatus] = useState("Remove")

    const handleAssignEventMentor = (mentorId) => {
        if (activeEvent === "") {
            return (window.alert('Select an event'))
        } else {
            let index = mentorsToAdd.indexOf(mentorId)
            if (index == -1) {
                onMentorsAdd([...mentorsToAdd, mentorId])
            }
        }
    }

    const handleUnAssignEventMentor = (mentorId) => {
        if (activeEvent === "") {
            return (window.alert('Select an event'))
        } else {
            let index = mentorsToAdd.indexOf(mentorId)
            let unsassigned = [...mentorsToAdd]
            if (index !== -1) {
                unsassigned.splice(index, 1)
            } else {
                unsassigned
            }
            onMentorsAdd(unsassigned)
        }
    }

    const handleRemoveStatus = (event) => {
        const mentorId = event.target.value
        if (removedStatus == 'Remove') {
            console.log("card removing mentor", mentorId)
            handleRemoveList(mentorId)
            setRemovedStatus("Undo")
        } else if (removedStatus == 'Undo') {
            handleRemoveUndo(mentorId)
            setRemovedStatus("Remove")
        }
    }

    const handleAssignStatus = (event) => {
        const mentorId = event.target.value
        if (assignedStatus == 'Assign') {
            console.log('card assigning mentor ', mentorId)
            handleAssignEventMentor(mentorId)
            setAssignedStatus("Undo")
        } else if (assignedStatus == 'Undo') {
            console.log('undo assign ', mentorId)
            handleUnAssignEventMentor(mentorId)
            setAssignedStatus("Assign")
        }
    }

    const handleRemoveUndo = (mentorId) => {
        let index = mentorsToRemove.indexOf(mentorId)
        let unRemove = [...mentorsToRemove]
        if (index !== -1) {
            unRemove.splice(index, 1)
        } else {
            unRemove
        }
        onRemoveMentors(unRemove)
    }

    const handleRemoveList = (mentorId) => {
        let index = mentorsToRemove.indexOf(mentorId)
        if (index == -1) {
            console.log("mentor card mentorid to remove list", mentorId)
            onRemoveMentors([...mentorsToRemove, mentorId])
        }
    }

    return (
        <>
            <div className='mentor-card' key={mentorDataDetails.id}>
            <div className="mentor-name-container">
            <p id="mentor-name">{mentorDataDetails.first_name} {mentorDataDetails.last_name} </p>
            {mentorDataDetails.rank == 'Lead' ?
                    <p id="lead">{mentorDataDetails.rank}</p>
                    :  
                     mentorDataDetails.rank == 'Mid-level'? 
                    <p id="mid-level">{mentorDataDetails.rank}</p>
                    :
                    <p id="junior">{mentorDataDetails.rank}</p>
                    }   
                    </div>
                <div className='mentor-info'>
                    <p>{mentorDataDetails.is_active ? "Available" : "Not available"} </p>
                    <>{mentorDataDetails.skills.map((skill, key) => {
                        return (<li key={key}>{skill.name} </li>)
                    })}</>
                    <p>{mentorDataDetails.location}</p>
                </div>
                <div className='assign-buttons'>
                    {allMentorEvents.find(mentorevent => (mentorevent.mentor_id == mentorDataDetails.id && mentorevent.event_id == activeEvent)) != undefined ?  

                    <>
                         {allMentorEvents.find(mentorevent => (mentorevent.mentor_id == mentorDataDetails.id && mentorevent.event_id == activeEvent && mentorevent.confirmed))?
                            <button className="removing" onClick={handleRemoveStatus} value={mentorDataDetails.id}>{removedStatus}</button>
                        :
                            <button className="assigning" onClick={handleAssignStatus} value={mentorDataDetails.id}>{assignedStatus}</button>
                         }
                    </>
                        :
                    <button className="assigning" onClick={handleAssignStatus} value={mentorDataDetails.id}>{assignedStatus}</button>
                    }
                </div>
            </div>
        </>
    )
}

export default MentorCard;