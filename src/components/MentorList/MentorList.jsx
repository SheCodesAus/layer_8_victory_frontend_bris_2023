import { useState, setState, useEffect } from 'react'
import useMentors from '../../hooks/use-mentors'
import useMentorEvents from '../../hooks/use-mentor-events'
import './MentorList.css'

function MentorList({activeEvent,
    mentorsToAdd, 
    onMentorsAdd}) {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()
    
    const [searchTermSkill, setSearchTermSkill] = useState("")
    const [searchTermLocation, setSearchTermLocation] = useState("")
    const [searchTermRank, setSearchTermRank] = useState("")

    // Need to create new state to handle assignment status of mentors, so we only have one button
    const handleAssignEventMentor = (event) => {

        if (activeEvent === "") {
            return (window.alert('Select an event'))
        } else {
            if (mentorevents.find(elm => {
                return (elm.mentor_id == event.target.value && 
                elm.event_id == activeEvent && 
                elm.is_deleted == false)
            })) {
                return (window.alert('Already assigned'))
            } else {
                let index = mentorsToAdd.indexOf(event.target.value)
                if (index == -1 ){
                    onMentorsAdd([...mentorsToAdd, event.target.value])
                }
            }
        }
    }

    const handleUnAssignEventMentor = (event) => {

        if (activeEvent === "") {
            return (window.alert('Select an event'))
        } else {
            let index = mentorsToAdd.indexOf(event.target.value)
            let unsassigned = [...mentorsToAdd]

        if (index !== -1) {
            unsassigned.splice(index,1)
        } else {
            unsassigned
        }
        onMentorsAdd(unsassigned)
    }
}
    const handleChangeSkill = e => setSearchTermSkill(e.target.value)
    const handleChangeLocation = e => setSearchTermLocation(e.target.value)
    const handleChangeRank = e => setSearchTermRank(e.target.value)

    if (isMentorsLoading) {
        return<div>Mentors loading...</div>
    } else {
        return(
            <div className='mentor-list'>
                <p>Full Mentor List</p>
                <input className='search-box'
                    type='text' 
                    value={searchTermSkill} 
                    onChange={handleChangeSkill} 
                    placeholder='Skill'>
                </input>
                <input className='search-box'
                    type='text' 
                    value={searchTermLocation} 
                    onChange={handleChangeLocation} 
                    placeholder='Location'>
                </input>
                <input className='search-box'
                    type='text' 
                    value={searchTermRank} 
                    onChange={handleChangeRank} 
                    placeholder='Rank'>
                </input>
                {/* name..... 
                    <input className='search-box'
                    type='text' 
                    value={searchTerm} 
                    onChange={handleChangeName} 
                    placeholder='Skill'>
                </input> */}
                <ul>
                    {mentors.sort((a,b) => {
                    return a.first_name - b.first_name 
                }).filter(o => o.location.includes(searchTermLocation)).map((mentorDataDetails) => {
                        return(
                            <div className='mentors' key={mentorDataDetails.id}>{mentorDataDetails.first_name} {mentorDataDetails.last_name} ({mentorDataDetails.rank}) {mentorDataDetails.mobile} available: {mentorDataDetails.is_active.toString()} 
                                <div className='assign-buttons'>
                                <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default MentorList