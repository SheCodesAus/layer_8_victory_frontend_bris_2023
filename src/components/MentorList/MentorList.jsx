import { useState, useEffect } from 'react'
import MentorCard from '../MentorCard/MentorCard'
import './MentorList.css'

// // --- Needs authentication handling to check token belongs to staff ---///

function MentorList({
    activeEvent, 
    allMentors,
    mentorsToAdd, 
    onMentorsAdd, 
    allMentorEvents,
    mentorsToRemove, 
    onRemoveMentors }) {

    const [searchTermSkill, setSearchTermSkill] = useState("All")
    const [searchTermLocation, setSearchTermLocation] = useState("All")
    const [searchTermRank, setSearchTermRank] = useState("All")

    const [filteredMentors, updatFilteredMentors] = useState()
    const [currentEventConfirmedMentors, setCurrentEventConfirmedMentors ] = useState()

    
    // TODO Some of these should be grabbed from API (skills)
    const skills = ["Python", "Django", "DRF", "React", "Javascript", "Front-end", "Back-end", "HTML-CSS"]
    const ranks = ["Junior", "Mid-level", "Lead"]
    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]


    useEffect(() => {
        
        setCurrentEventConfirmedMentors(allMentorEvents.filter(confirmed => (
            confirmed.event_id == activeEvent &&
            confirmed.confirmed == true
        )))

    }, [allMentorEvents])


    useEffect(() => {

        updatFilteredMentors(allMentors.filter(
            mentor => (mentor.onboarding_status == 'Ready' && 
            !mentor.is_superuser 
            )
        ))

    }, [allMentors])


    useEffect(() => {
        
        // Filtering the mentor list based on chosen selection in any of three filters - location/rank/skill
        // -----------------------------------------------------------------------------------------------
        // This useEffect filters our `mentors` array to show `mentors` that match three requirements, 
        // their location is == to the `searchTermLocation`. Their skill includes the `searchTermSkill` 
        // and their rank is equal to the `searchTermRank`. If the `searchTermRank` is all we do not check their values, 
        // and instead set the pass condition as `true` so we can move onto the next filter step.
       
        const newMentors = allMentors.filter(mentor => (
            (searchTermLocation == 'All' ? true : mentor.location == searchTermLocation) &&
            (searchTermSkill == 'All' ? true : mentor.skills.filter(skill => skill.name == searchTermSkill).length > 0) &&
            (searchTermRank == 'All' ? true : mentor.rank == searchTermRank)
        ))
        updatFilteredMentors(newMentors.filter(
            mentor => (mentor.onboarding_status == 'Ready' && 
            !mentor.is_superuser 
            )))
    
    }, [searchTermSkill, searchTermLocation, searchTermRank])


    if (allMentors == undefined) {
        return <div>Mentors loading...</div>
    } else {
        return (
            <div className='mentor-list'>
                <p>Find a Mentor</p>
                <p id="mentor-status-info">Find mentors that are onboarded and ready to mentor!</p>
                <div className='filter-group'>
                <p>Location</p>
                <select className='filter' onChange={(e) => setSearchTermLocation(e.target.value)} value={searchTermLocation}>
                    <option value="All">All</option>
                    {locations.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>
                <p>Skill</p>
                <select className='filter' onChange={(e) => setSearchTermSkill(e.target.value)} value={searchTermSkill}>
                    <option value="All">All</option>
                    {skills.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>
                <p>Rank</p>
                <select className='filter' onChange={(e) => setSearchTermRank(e.target.value)} value={searchTermRank}>
                    <option value="All">All</option>
                    {ranks.map((currentValue, index) => (
                        <option key={index} value={currentValue}>
                            {currentValue}
                        </option>
                    ))}
                </select>
                </div>
                {filteredMentors === undefined ? <>
                    <ul>No mentors</ul>

                </> :
                    <ul>{filteredMentors.sort((a, b) => {
                        return a.first_name - b.first_name
                    }).map((mentorDataDetails,key) => {

                        return (<div key={key}>
                            <MentorCard mentorDataDetails={mentorDataDetails} 
                                allMentorEvents={allMentorEvents}
                                mentorsToRemove={mentorsToRemove}
                                onRemoveMentors={onRemoveMentors}
                                        mentorsToAdd={mentorsToAdd} 
                                        onMentorsAdd={onMentorsAdd}
                                        activeEvent={activeEvent}
                            /></div>
                        )
                    })}</ul>
                }

            </div>
        )
     }
}
export default MentorList