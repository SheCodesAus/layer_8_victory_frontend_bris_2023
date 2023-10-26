import { useState, setState, useEffect } from 'react'
import useMentors from '../../hooks/use-mentors'
import useSkills from "../../hooks/use-skills";
import './MentorListDetails.css'

// // --- Needs authentication handling to check token belongs to staff ---///

function MentorListDetails({ onEditMentorClick, editMentorOpen, onChangeActiveMentor, activeMentor }) {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const { skills, skillsLoading, skillsError } = useSkills([]);

    // TODO Some of these should be grabbed from API (skills)
    const status = ["Applied", "Validated", "Interviewed", "Ranked", "Accepted", "Onboarded", "Ready"]
    const ranks = ["Junior", "Mid-level", "Lead"]
    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]

    const [searchTermStatus, setSearchTermStatus] = useState("All")
    const [searchTermSkill, setSearchTermSkill] = useState("All")
    const [searchTermLocation, setSearchTermLocation] = useState("All")
    const [searchTermRank, setSearchTermRank] = useState("All")

    const [filteredMentors, updatFilteredMentors] = useState()

    const handleOpenMentor = (event) => {
        onChangeActiveMentor(event.target.value)
        onEditMentorClick("true")
    }


    useEffect(() => {
        updatFilteredMentors(mentors.filter(
            mentor => (!mentor.is_superuser)
        ))
    }, [mentors])


    useEffect(() => {

        // Filtering the mentor list based on chosen selection in any of three filters - location/rank/skill
        // -----------------------------------------------------------------------------------------------
        // This useEffect filters our `mentors` array to show `mentors` that match three requirements, 
        // their location is == to the `searchTermLocation`. Their skill includes the `searchTermSkill` 
        // and their rank is equal to the `searchTermRank`. If the `searchTermRank` is all we do not check their values, 
        // and instead set the pass condition as `true` so we can move onto the next filter step.
        console.log(mentors)
        const newMentors = mentors.filter(mentor => (
            (searchTermStatus == 'All' ? true : mentor.onboarding_status == searchTermStatus) &&
            (searchTermLocation == 'All' ? true : mentor.location == searchTermLocation) &&
            (searchTermSkill == 'All' ? true : mentor.skills.filter(skill => skill.name == searchTermSkill).length > 0) &&
            (searchTermRank == 'All' ? true : mentor.rank == searchTermRank)
        ))

        updatFilteredMentors(newMentors.filter(mentor =>(!mentor.is_superuser)))

    }, [searchTermStatus, searchTermSkill, searchTermLocation, searchTermRank])

    if (skillsLoading) {
        return <p>Loading skills...</p>;
      }
    
      if (skillsError) {
        return <p>{skillsError.message}</p>;
      }
    if (isMentorsLoading) {
        return <div>Mentors loading...</div>
    } else {

        return (
            <>
                <div className='mentor-detail-list'>
                    <p id="mentor-detail-title">Find a Mentor</p>
                    <div className='filter-group-mentor-details-dash'>
                        <p>Onboarding Status</p>
                        <select className='filter-mentor-details-dash' onChange={(e) => setSearchTermStatus(e.target.value)} value={searchTermStatus}>
                            <option value="All">All</option>
                            {status.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                        <p>Location</p>
                        <select className='filter-mentor-details-dash' onChange={(e) => setSearchTermLocation(e.target.value)} value={searchTermLocation}>
                            <option value="All">All</option>
                            {locations.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                        <p>Skill</p>
                        <select className='filter-mentor-details-dash' onChange={(e) => setSearchTermSkill(e.target.value)} value={searchTermSkill}>
                            <option value="All">All</option>
                            {skills.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                        <p>Rank</p>
                        <select className='filter-mentor-details-dash' onChange={(e) => setSearchTermRank(e.target.value)} value={searchTermRank}>
                            <option value="All">All</option>
                            {ranks.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredMentors === undefined ? 
                    <>
                        <ul>No mentors</ul>
                    </> :
                        <ul>{filteredMentors.sort((a, b) => {
                            return a.first_name - b.first_name
                        }).map((mentorDataDetails, key) => {

                            // TODO These should be a card component
                            return (<div key={key}>
                                <div className='mentors-detail' key={mentorDataDetails.id}>
                                    <div className='mentor-info'>
                                        <p>Name: {mentorDataDetails.first_name} {mentorDataDetails.last_name}</p>
                                        <p>Onboarding Status: {mentorDataDetails.onboarding_status}</p>
                                        <p>Mobile: {mentorDataDetails.mobile} </p>
                                        <p>Location: {mentorDataDetails.location}</p>
                                    </div>
                                    <button className='manage-mentor-detail' onClick={handleOpenMentor} value={mentorDataDetails.id}>Manage Mentor</button>
                                </div>
                            </div>
                            )
                        })}</ul>
                    }
                </div>
            </>
        )
    }
}
export default MentorListDetails