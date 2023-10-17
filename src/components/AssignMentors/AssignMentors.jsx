import { useState } from 'react'
import postMentorEvents from '../../../api/post-mentor-events'
import useMentorEvents from '../../hooks/use-mentor-events'
import useMentors from '../../hooks/use-mentors'


function MentorEventsManage() {

    const eventID = "2"

    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()
    const { mentors, isMentorsLoading, isMentorsError } = useMentors()

    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(id && riderdetails.kms_ceiling) {
                postMentorEvents(
                    id,
                    riderdetails.team,
                ).then((response) => {
                    // re rerender everything?

                }).catch((error)=>{
                    setErrorMessage(`${[error.message]}`)
                    setIsLoading(false)
                })
            }
        }




    console.log(mentorevents, eventID)

    return(
        <div className='container-apply'>
            <div>
                <p>Mentors assigned to event {eventID}</p>
            <ul>
            {mentorevents.filter(key => key.event_id == eventID).map((mentorData, key) => {
                const mentorDetails = mentors.find(mentor => {
                    return mentor.id === mentorData.mentor_id
                })
                return(<li key={key}>Mentor: {mentorDetails.username}</li>)
            })}
            </ul>
            <br></br>
            
            <p>All mentors</p>
            <ul>
            {mentors.map((mentorDetails, key) => {
                
                return(<li key={key}>Mentor: {mentorDetails.username} </li>)
            })}


            </ul>
            </div>
        </div>
    )




}
export default MentorEventsManage




