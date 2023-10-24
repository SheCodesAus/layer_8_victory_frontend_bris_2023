import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MentorCard = (props) => {

    const navigate = useNavigate();


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
                    <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                    <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                </div>
            </div>
        </>
    )
}

export default MentorCard;