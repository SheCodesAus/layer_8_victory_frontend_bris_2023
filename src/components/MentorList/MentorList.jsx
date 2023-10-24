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

    const [filteredMentors, updatFilteredMentors] = useState()


    // Some of these should be grabbed from API (skills)
    const skills = ["Python", "Django", "DRF", "React", "Javascript", "Front-end", "Back-end", "HTML-CSS"]
    const ranks = ["Junior", "Mid-level", "Lead"]
    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]


    // TODO Initial mentor list needs to exclude mentor.is_superuser true (ie admins) & possibly mentor.is_staff and only show mentors with 
    // mentor.onboarding_status == 'Ready' (ie we should only see a list of mentors that are of status 'Ready')

    useEffect(() => {
        updatFilteredMentors(mentors)
    }, [mentors])


    useEffect(() => {
        // Filtering the mentor list based on chosen selection in any of three filters - location/rank/skill
        // -----------------------------------------------------------------------------------------------
        // This useEffect filters our `mentors` array to show `mentors` that match three requirements, 
        // their location is == to the `searchTermLocation`. Their skill includes the `searchTermSkill` 
        // and their rank is equal to the `searchTermRank`. If the `searchTermRank` is all we do not check their values, 
        // and instead set the pass condition as `true` so we can move onto the next filter step.

        const newMentors = mentors.filter(mentor => (
            (searchTermLocation == 'All' ? true : mentor.location == searchTermLocation) &&
            (searchTermSkill == 'All' ? true : mentor.skills.filter(skill => skill.name == searchTermSkill).length > 0) &&
            (searchTermRank == 'All' ? true : mentor.rank == searchTermRank)
        ))
        updatFilteredMentors(newMentors)

    }, [searchTermSkill, searchTermLocation, searchTermRank])

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

                {filteredMentors === undefined ? <>
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
                    <ul>{filteredMentors.sort((a, b) => {
                        return a.first_name - b.first_name
                    }).map((mentorDataDetails) => {
                        return (
                            <div className='mentor-card' key={mentorDataDetails.id}>
                                <div className='mentor-info'>
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