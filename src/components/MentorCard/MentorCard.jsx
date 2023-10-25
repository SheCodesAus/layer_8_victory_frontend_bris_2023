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
                <div className='mentor-info'>
                    <p>{mentorDataDetails.rank} Mentor</p>
                    <p>{mentorDataDetails.first_name} {mentorDataDetails.last_name} </p>
                    <p>Available: {mentorDataDetails.is_active ? "Yes" : "No"} </p>
                    <>{mentorDataDetails.skills.map((skill, key) => {
                        return (<li key={key}>{skill.name} </li>)
                    })}</>
                    <p>{mentorDataDetails.location}</p>
                </div>
                <div className='assign-buttons'>
                    {allMentorEvents.filter(key => (key.mentor_id == mentorDataDetails.id)).length > 0 ?
                        <>
                            {allMentorEvents.filter(key => (key.mentor_id == mentorDataDetails.id)).map((mentor_status) => {
                                if (mentor_status.confirmed) {
                                    return (<button className="removing" onClick={handleRemoveStatus} value={mentorDataDetails.id}>{removedStatus}</button>)
                                } else {
                                    return (<button className="assigning" onClick={handleAssignStatus} value={mentorDataDetails.id}>{assignedStatus}</button>)
                                }
                            })}</>
                        :
                        <button className="assigning" onClick={handleAssignStatus} value={mentorDataDetails.id}>{assignedStatus}</button>
                        }
                </div>
            </div>
        </>
    )
}

export default MentorCard;