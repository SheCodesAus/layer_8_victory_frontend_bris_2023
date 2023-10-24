import { useState, setState, useEffect, useRef, useLayoutEffect } from 'react'
import useMentors from '../../hooks/use-mentors'
import useMentorEvents from '../../hooks/use-mentor-events'
import './MentorList.css'

function MentorList({ activeEvent,
    mentorsToAdd,
    onMentorsAdd }) {

    const { mentors, isMentorsLoading, isMentorsError, refreshComp } = useMentors()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError } = useMentorEvents()

    const [searchTermSkill, setSearchTermSkill] = useState("All")
    const [searchTermLocation, setSearchTermLocation] = useState("All")
    const [searchTermRank, setSearchTermRank] = useState("All")

    // const [filters, setFilters] = useState({
    //     location:"",
    //     rank: "",
    //     skills: ""
    // })

    const [filteredUsers, updateFilteredUsers] = useState()


    // Some of these should be grabbed from API (skills)
    const skills = ["Python", "Django", "DRF", "React", "Javascript", "Front-end", "Back-end", "HTML-CSS"]
    const ranks = ["Junior", "Mid-level", "Lead"]
    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]


    useEffect(() => {
        updateFilteredUsers(mentors)
    }, [mentors])


    useEffect(() => {
        const newUsers = mentors.filter(mentor => (
            (searchTermLocation == 'All' ? true : mentor.location == searchTermLocation) &&
            (searchTermSkill == 'All' ? true : mentor.skills.filter(skill => skill.name == searchTermSkill).length > 0) &&
            (searchTermRank == 'All' ? true : mentor.rank == searchTermRank)
        ))
        updateFilteredUsers(newUsers)

    }, [searchTermSkill, searchTermLocation, searchTermRank])


    // TODO Initial mentor list needs to exclude mentor.is_superuser true (ie admins) and only have mentors with 
    // mentor.onboarding_status == 'Ready' (ie can't hide/prevent non-ready mentors)


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
                if (index == -1) {
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
                unsassigned.splice(index, 1)
            } else {
                unsassigned
            }
            onMentorsAdd(unsassigned)
        }
    }


    if (isMentorsLoading) {
        return <div>Mentors loading...</div>
    } else {
        return (
            <div className='mentor-list'>
                <p>Full Mentor List</p>
                <select className='filter' onChange={(e) => setSearchTermLocation(e.target.value)} value={searchTermLocation}>
                    <option value="All">All</option>
                    {locations.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>

                <select className='filter' onChange={(e) => setSearchTermSkill(e.target.value)} value={searchTermSkill}>
                    <option value="All">All</option>
                    {skills.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>

                <select className='filter' onChange={(e) => setSearchTermRank(e.target.value)} value={searchTermRank}>
                    <option value="All">All</option>
                    {ranks.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>

                {filteredUsers === undefined ? <>
                    <ul>{mentors.sort((a, b) => {
                        return a.first_name - b.first_name
                    }).map((mentorDataDetails) => {
                        return (
                            <div className='mentors' key={mentorDataDetails.id}>{mentorDataDetails.first_name} {mentorDataDetails.last_name} ({mentorDataDetails.rank}) {mentorDataDetails.mobile} available: {mentorDataDetails.is_active.toString()}
                                <div className='assign-buttons'>
                                    <button className='assigning' onClick={handleAssignEventMentor} value={mentorDataDetails.id}>Assign</button>
                                    <button className='assigning' onClick={handleUnAssignEventMentor} value={mentorDataDetails.id}>Undo</button>
                                </div>
                            </div>
                        )
                    })}</ul>

                </> :
                    <ul>{filteredUsers.sort((a, b) => {
                        return a.first_name - b.first_name
                    }).map((mentorDataDetails) => {
                        return (
                            <div className='mentor-card' key={mentorDataDetails.id}>
                                <div className='mentor-info'>
                                <p>{mentorDataDetails.id} Mentor</p>
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
                        )
                    })}</ul>
                }

            </div>
        )
    }
}
export default MentorList