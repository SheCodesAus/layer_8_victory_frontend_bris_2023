import { useState, setState } from 'react'
import useMentors from '../../hooks/use-mentors'
import './MentorList.css'

function MentorList({
    mentorsToAdd, 
    onMentorsAdd}) {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()

   
    const handleAssignEventMentor = (event) => {

        let index = mentorsToAdd.indexOf(event.target.value)

        if (index === -1 ){
            onMentorsAdd([...mentorsToAdd, event.target.value])
        }
    }


    const handleUnAssignEventMentor = (event) => {

        let index = mentorsToAdd.indexOf(event.target.value)

        let unsassigned = [...mentorsToAdd]

        if (index !== -1) {
            unsassigned.splice(index,1)
        } else {
            unsassigned
        }
        
  
        onMentorsAdd(unsassigned)

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

                    if( mentorsToAdd.indexOf(mentorDataDetails.id) !== -1 ){
                        console.log("yes")
                    }
                    
                    return(<div>

                        <li key={key}>Mentor ID: {mentorDataDetails.id} 
                        
                        
                        { (mentorsToAdd.indexOf(mentorDataDetails.id) !== -1)  ? 
                                
                        <button onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>UnAssign</button>
                        :
                        <button onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                        }
                
                        
                        </li>
                    </div>
                    )
                })}
            </ul>
        </div>
    )

}
export default MentorList