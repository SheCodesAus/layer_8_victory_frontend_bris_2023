import React from "react";
import { useState } from "react";
import './MentorCardDetail.css'

const MentorCardDetail = ({
    mentorDataDetails,
    onEditMentorClick, 
    editMentorOpen, 
    onChangeActiveMentor, 
    activeMentor
    }) => {

    
    const handleOpenMentor = (event) => {
        onChangeActiveMentor(event.target.value)
        onEditMentorClick("true")
    }

    return (
        <>
            <div className={activeMentor == mentorDataDetails.id ? "mentor-card-open":"mentor-card"} key={mentorDataDetails.id}>
            
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
                <div className="mentor-set-even">
                <div className='mentor-info'>
                    <p>{mentorDataDetails.is_active ? "Available" : "Not available"} </p>
                    <p>{mentorDataDetails.onboarding_status}</p>
                    <p>{mentorDataDetails.location}</p>
                </div>
          
                <button className='manage-mentor-detail' onClick={handleOpenMentor} value={mentorDataDetails.id}>Manage Mentor</button>
                </div>
            </div>
        </>
    )
}

export default MentorCardDetail;