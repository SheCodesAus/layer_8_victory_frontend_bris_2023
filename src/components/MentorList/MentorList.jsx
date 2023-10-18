import { useState } from 'react'
import useMentors from '../../hooks/use-mentors'
import './MentorList.css'

function MentorList({mentorListAssigned, onChangeMentorList}) {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()



    const handleAssignEventMentor = (event) => {

        onChangeMentorList([...mentorListAssigned, event.target.value])

    }


    const handleUnAssignEventMentor = (event) => {

        let index = mentorListAssigned.indexOf(event.target.value)

        let unsassigned = [...mentorListAssigned]

        unsassigned.splice(index,1)
  
        onChangeMentorList(unsassigned)

    }

    if (isMentorsLoading) {
        return<div>Mentors loading...</div>
    }
    console.log(mentors)

    return(
        <div className='mentor-list'>
            <p>Full Mentor List</p>
            <ul>
                {mentors.map((mentorDataDetails, key) => {
                    
                    return(<div>

                        <li key={key}>Mentor ID: {mentorDataDetails.id} </li>
                        <button onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                        <button onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>UnAssign</button>
                    </div>
                    )
                })}
            </ul>
        </div>
    )

}
export default MentorList