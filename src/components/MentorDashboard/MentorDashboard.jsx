import { useState, useEffect } from 'react'
import MentorListDetails from '../MentorListDetails/MentorListDetails'
import EditMentorDetailsForm from '../EditMentorDetailsForm/EditMentorDetailsForm'

import './MentorDashboard.css'


function MentorDashboard() {

    const [activeMentor, setActiveMentor] = useState("")
    const [editMentorOpen, setEditMentorOpen] = useState("false")

    // Editing mentors
    const onEditMentorClick = (event) => {
        console.log('active event', event)
        setEditMentorOpen(event)
    }

    // Current event view
    const onChangeActiveMentor = (mentorID) => {
        console.log("mentorid",mentorID)
        setActiveMentor(mentorID)
    }

    return (
        <div className='mentor-dashboard'>

            <MentorListDetails editMentorOpen={editMentorOpen} onEditMentorClick={onEditMentorClick} activeMentor={activeMentor} onChangeActiveMentor={onChangeActiveMentor}/>

            {editMentorOpen === "true" ?
                <EditMentorDetailsForm onEditMentorClick={onEditMentorClick} editMentorOpen={editMentorOpen} onChangeActiveMentor={onChangeActiveMentor} activeMentor={activeMentor} />
            :
                <div className='no-content-yet'>
                    Filter/click on a mentor to get started.
                </div>
            }
        </div>
        )
}

export default MentorDashboard