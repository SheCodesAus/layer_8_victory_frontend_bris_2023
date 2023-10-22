import { useState, setState, useEffect } from 'react'
import useMentors from '../../hooks/use-mentors'
import './MentorListDetails.css'

function MentorListDetails({onEditMentorClick, editMentorOpen,  onChangeActiveMentor, activeMentor}) {

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    
    // const [searchTermSkill, setSearchTermSkill] = useState("")
    const [searchTermLocation, setSearchTermLocation] = useState("")
    // const [searchTermRank, setSearchTermRank] = useState("")

    // const handleChangeSkill = e => setSearchTermSkill(e.target.value)
    const handleChangeLocation = e => setSearchTermLocation(e.target.value)
    // const handleChangeRank = e => setSearchTermRank(e.target.value)

    const handleOpenMentor = (event) =>{
        onChangeActiveMentor(event.target.value)
        onEditMentorClick("true")

    }

    if (isMentorsLoading) {
        return<div>Mentors loading...</div>
    } else {
        return(
            // <div className='mentor-detail-list'>
            //     <p>Full Mentor List</p>
            //     <input className='search-box'
            //         type='text' 
            //         value={searchTermSkill} 
            //         onChange={handleChangeSkill} 
            //         placeholder='Skill'>
            //     </input>
            //     <input className='mentor-search-box'
            //         type='text' 
            //         value={searchTermLocation} 
            //         onChange={handleChangeLocation} 
            //         placeholder='Location'>
            //     </input>
            //     <input className='mentor-search-box'
            //         type='text' 
            //         value={searchTermRank} 
            //         onChange={handleChangeRank} 
            //         placeholder='Rank'>
            //     </input>
                <div className='mentors-detail-list'>
                <ul>
                    {mentors.sort((a,b) => {
                    return a.first_name - b.first_name 
                        }).filter(o => o.location.includes(searchTermLocation)).map((mentorDataDetails) => {
                        return(
                            <div className='mentors-detail' key={mentorDataDetails.id}>
                                <div className='mentor-info'>
                                    <p>Name: {mentorDataDetails.first_name} {mentorDataDetails.last_name}</p>
                                    <p>Rank: {mentorDataDetails.rank}</p>
                                    <p>Mobile: {mentorDataDetails.mobile} </p>
                                    <p>Available: {mentorDataDetails.is_active.toString()}</p>
                                    </div>
                                <button className='manage-mentor' onClick={handleOpenMentor} value={mentorDataDetails.id}>Manage Mentor</button>
                            </div>
                        )
                    })}
                </ul>
                </div>
        )
    }
}
export default MentorListDetails