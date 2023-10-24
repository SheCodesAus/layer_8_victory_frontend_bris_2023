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

    const [filters, setFilters] = useState({
        location:"",
        rank: "",
        skills: ""
    })

    const [filteredUsers, updateFilteredUsers] = useState()


    // Some of these should be grabbed from API (skills)
    const skills = ["Python","Django","DRF","React", "Javascript", "Front-end","Back-end","HTML-CSS"]
    const ranks = ["Junior","Mid-level","Lead"]
    const locations = [ "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra",  "Darwin"]


    useEffect(() => {
            updateFilteredUsers(mentors)
    }, [mentors])
    

    // TODO Initial mentor list needs to exclude mentor.is_superuser true (ie admins) and only have mentors with 
    // mentor.onboarding_status == 'Ready' (ie can't hide/prevent non-ready mentors)

    const handleChange = (searchTerm, type) => {

        // let result = filterTool(filteredUsers, filters)
        // updateFilteredUsers(result)
        // console.log('here', result)

        if (type == 'location'){
            if (searchTerm === 'all') {
                let updatedLocation = mentors
                updateFilteredUsers(updatedLocation)                    
            } else {
                updateFilteredUsers(mentors.filter(x => (x && x.location && x.location.includes(searchTerm))))
            }

        } else if (type == 'skill'){
            if (searchTerm === 'all') {
                let updatedSkills= mentors
                updateFilteredUsers(updatedSkills)                    
            } else {
                let skilledMentors = []
                mentors.forEach( mentor => {
                    if (mentor.skills != []) {

                        if (mentor.skills.filter((skill => (skill.name.includes(searchTerm)))).length > 0) {
                            skilledMentors.push(mentor)
                        }
                    }
                })
                updateFilteredUsers(skilledMentors)
            }

        } else if (type == 'rank'){
            if (searchTerm === 'all') {
                let updatedRank = mentors
                updateFilteredUsers(updatedRank)                    
            } else {
                updateFilteredUsers(mentors.filter(x => (x && x.rank && x.rank.includes(searchTerm))))
            }
        }
    }

    // const filterTool = (target, filters) => {
    //     var filterKeys = Object.keys(filters);
        
    //     return target.filter(function (eachObj) {
    //         console.log("eact obj",eachObj)
    //       return filterKeys.every(function (eachKey) {
    //         console.log("each key",eachKey)
    //         if (!filters[eachKey].length) {
    //             console.log("found")
    //           return true; 
    //         }
    //         return filters[eachKey].includes(eachObj[eachKey]);
    //      });
    //  });
    // }


    const handleFilterChange = (type) => (e) => {
        const searchTerm = e.target.value
        switch(type){
            case 'location':
                setSearchTermLocation(searchTerm)
                //setFilters({...filters, location: searchTerm} )
                handleChange(searchTerm, type)
            case 'skill':
                //setFilters({...filters, skill: searchTerm} )
                setSearchTermSkill(searchTerm)
                handleChange(searchTerm, type)
            case 'rank':
                //setFilters({...filters, rank: searchTerm} )
                setSearchTermRank(searchTerm)
                handleChange(searchTerm, type)
        }

        console.log(filters)
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
                <select className='filter' onChange={handleFilterChange('location')} value={searchTermLocation}>
                        <option value="all">All</option>
                        {locations.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

                <select className='filter' onChange={handleFilterChange('skill')} value={searchTermSkill}>
                        <option value="all">All</option>
                        {skills.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

                <select className='filter' onChange={handleFilterChange('rank')} value={searchTermRank}>
                <option value="all">All</option>
                        {ranks.map((currentValue, index) => (
                            <option key={index} value={currentValue}>
                                {currentValue}
                            </option>
                            ))}
                </select>

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
                                <div className='mentor-card' key={mentorDataDetails.id}>
                                    <div className='mentor-info'>
                                        <p>{mentorDataDetails.rank} Mentor</p>
                                        <p>{mentorDataDetails.first_name} {mentorDataDetails.last_name} </p>
                                        <p>Available: {mentorDataDetails.is_active ? "Yes" : "No"} </p>
                                        <>{mentorDataDetails.skills.map((skill) => {
                                            return(<li>{skill.name} </li>)
                                        })}</>
                                        <p>{mentorDataDetails.location}</p>
                                     </div>
                                    <div className='assign-buttons'>
                                        <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                        <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                    </div>
                                </div>
                            )
                        })}</ul>
                }
                
            </div>
        )
    }
}
export default MentorList