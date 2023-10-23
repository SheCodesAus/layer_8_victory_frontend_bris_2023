import { useState, setState, useEffect, useRef, useLayoutEffect } from 'react'
import useMentors from '../../hooks/use-mentors'
import useMentorEvents from '../../hooks/use-mentor-events'
import './MentorList.css'

function MentorList({activeEvent,
    mentorsToAdd, 
    onMentorsAdd}) {

    const { mentors, isMentorsLoading, isMentorsError, refreshComp } = useMentors()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError} = useMentorEvents()
    
    const [searchTermSkill, setSearchTermSkill] = useState("")
    const [searchTermLocation, setSearchTermLocation] = useState("")
    const [searchTermRank, setSearchTermRank] = useState("")
    
    const [filteredUsers, updateFilteredUsers] = useState()

    const skills = ["Python","Django","DRF","React", "Javascript", "Front-end","Back-end","HTML-CSS"]
    const ranks = ["Junior","Mid-level","Lead"]
    const locations = [ "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra",  "Darwin"]


    useEffect(() => {
            updateFilteredUsers(mentors)
    }, [mentors])
    

   const handleChange = (searchTerm, type) => {
        

        if (type == 'location' ){
            if (searchTerm === 'all') {
                let updatedLocation = mentors
                updateFilteredUsers(updatedLocation)                    
            } else {
                console.log("in else", searchTerm)
                updateFilteredUsers(mentors.filter(x => (x && x.location && x.location.includes(searchTerm))))
            }

        } else if (type == 'skill'){
            if (searchTerm === 'all') {
                let updatedSkills= mentors
                updateFilteredUsers(updatedSkills)                    
            } else {
                console.log("in else", searchTerm)
                
                mentors.map((element)  => {

                    return{...element,  subElements: element.subElements.filter((subElement) => subElement.name === searchTerm)}
                })
               
            }

        } else if (type == 'rank'){
            if (searchTerm === 'all') {
                console.log("all")
                let updatedRank = mentors
                updateFilteredUsers(updatedRank)                    
            } else {
                console.log("in else", searchTerm)

                updateFilteredUsers(mentors.filter(x => (x && x.rank && x.rank.includes(searchTerm))))
            }
        }
    }

   

    const handleFilterChange = (type) => (e) => {
        const searchTerm = e.target.value
        console.log(searchTerm)
        switch(type){
            case 'location':
                setSearchTermLocation(searchTerm)
                handleChange(searchTerm, type)
            case 'skill':
                setSearchTermSkill(searchTerm)
                handleChange(searchTerm, type)
            case 'rank':
                setSearchTermRank(searchTerm)
                handleChange(searchTerm, type)
        }
    }



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
                <select onChange={handleFilterChange('location')} value={searchTermLocation}>
                        <option value="all">All</option>
                        {locations.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

                <select onChange={handleFilterChange('skill')} value={searchTermSkill}>
                        <option value="all">All</option>
                        {skills.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

                <select onChange={handleFilterChange('rank')} value={searchTermRank}>
                <option value="all">All</option>
                        {ranks.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

                {/* <input className='search-box'
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
                </input> */}

                {/* .filter(mentor => !mentor.is_superuser && mentor.onboarding_status == "Ready") */}

                {filteredUsers === undefined ? <>
                    <ul>{mentors.sort((a,b) => {
                        return a.first_name - b.first_name 
                    }).map((mentorDataDetails) => {
                            return(
                                <div className='mentors' key={mentorDataDetails.id}>{mentorDataDetails.first_name} {mentorDataDetails.last_name} ({mentorDataDetails.rank}) {mentorDataDetails.mobile} available: {mentorDataDetails.is_active.toString()} 
                                    <div className='assign-buttons'>
                                    <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                    <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                    </div>
                                </div>
                            )
                        })}</ul>
                
                </> :
                    <ul>{filteredUsers.sort((a,b) => {
                        return a.first_name - b.first_name 
                    }).map((mentorDataDetails) => {
                            return(
                                <div className='mentors' key={mentorDataDetails.id}>{mentorDataDetails.first_name} {mentorDataDetails.last_name} ({mentorDataDetails.rank}) {mentorDataDetails.mobile} available: {mentorDataDetails.is_active.toString()} 
                                    <div className='assign-buttons'>
                                    <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                    <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                    </div>
                                </div>
                            )
                        })}</ul>
                }
                
{/*                 
                <ul>
                    {mentors.sort((a,b) => {
                    return a.first_name - b.first_name 
                }).map((mentorDataDetails) => {
                        return(
                            <div className='mentors' key={mentorDataDetails.id}>{mentorDataDetails.first_name} {mentorDataDetails.last_name} ({mentorDataDetails.rank}) {mentorDataDetails.mobile} available: {mentorDataDetails.is_active.toString()} 
                                <div className='assign-buttons'>
                                <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                </div>
                            </div>
                        )
                    })}
                </ul> */}
            </div>
        )
    }
}
export default MentorList