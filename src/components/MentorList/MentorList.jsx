import { useState } from 'react'
import useMentors from '../../hooks/use-mentors'
import './MentorList.css'

function MentorList() {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()

    if (isMentorsLoading) {
        return<div>Mentors loading...</div>
    }
    console.log(mentors)

    return(
        <div className='mentor-list'>
            <p>Full Mentor List</p>
            <ul>
                {mentors.map((mentorDataDetails, key) => {
                    return(<li key={key}>Mentor: {mentorDataDetails.username} </li>)
                })}
            </ul>
        </div>
    )

}
export default MentorList