import React from "react";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import useMentorEvents from "../../hooks/use-mentor-events";

const MentorCard = ({mentorDataDetails, mentorsToAdd, onMentorsAdd, activeEvent}) => {

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()
    const [assignedStatus, setAssignedStatus] = useState("Assign")

    const handleAssignEventMentor = (mentorId) => {
        if (activeEvent === "") {
            return (window.alert('Select an event'))
        } else {
            if (mentorevents.find(elm => {
                console.log(" found",elm)
                return (elm.mentor_id == mentorId &&
                    elm.event_id == activeEvent &&
                    elm.confirmed == true)
            })) {
                return (window.alert('Already assigned'))
            } else {
                console.log("not yet")
                
                let index = mentorsToAdd.indexOf(mentorId)
                if (index == -1) {
                    onMentorsAdd([...mentorsToAdd, mentorId])
                }
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

    const handleAssignStatus = (event) => {
        const mentorId = event.target.value
        if (assignedStatus == 'Assign' ){
            handleAssignEventMentor(mentorId)
            setAssignedStatus("Undo")
        } else {
            handleUnAssignEventMentor(mentorId)
            setAssignedStatus("Assign")
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
                    <button className="assigning" onClick={handleAssignStatus} value={mentorDataDetails.id}>{assignedStatus}</button>
                </div>
            </div>
        </>
    )
}

export default MentorCard;