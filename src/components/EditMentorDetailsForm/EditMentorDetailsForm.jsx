import { useEffect, useState } from "react";
import useMentors from '../../hooks/use-mentors'
import useEvents from "../../hooks/use-events";
import putEditMentorAsStaff from "../../api/put-edit-mentor-as-staff";
import useMentorEvents from "../../hooks/use-mentor-events";
import './EditMentorDetailsForm.css'
import { useNavigate } from "react-router-dom";


function EditMentorForm({ editMentorOpen, onEditMentorClick, activeMentor, onChangeActiveMentor }) {

    const navigate = useNavigate()

    const { mentors, isMentorsLoading, isMentorsError } = useMentors()
    const { mentorevents, isMentorEventsLoading, isMentorEventsError } = useMentorEvents()
    const { events, isEventsLoading, isEventsError } = useEvents()

    const [selectedRank, setSelectedRank] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")
    const ranks = ["Junior", "Mid-level", "Lead"]
    const statuses = ["Applied", "Validated", "Interviewed", "Ranked", "Accepted", "Onboarded", "Ready"]


    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")

    const [mentordetails, setMentorDetails] = useState({
        id: activeMentor,
        onboarding_status: "",
        rank: "",
        private_notes: "",
        skills: ""
    })

    useEffect(() => {
        console.log(mentors)
        setMentorDetails(mentors.find(mentor => mentor.id == activeMentor))
        console.log("here")
    }, [mentors, activeMentor])


    const handleNavigate = (event) => {
        navigate(`/events/${event.target.value}`)
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setMentorDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const mentorInf = mentors.find(mentor => (mentor.id == activeMentor))

        let skill = ''
        let mentorskills = []
        for (skill in mentorInf.skills) {
            mentorskills.push(mentorInf.skills[skill].name)
        }

        // Private notes can't be blank
        let handleNotes = ""
        if (mentordetails.private_notes === '') {
            handleNotes = "No notes"
        } else {
            handleNotes = mentordetails.private_notes
        }


        if (mentordetails.id && mentordetails.onboarding_status && mentordetails.rank) {
            putEditMentorAsStaff(
                mentordetails.id,
                mentordetails.onboarding_status,
                mentordetails.rank,
                handleNotes,
                mentorskills
            ).then(
                (response) => {
                    const mentorid = response.id
                    onChangeActiveMentor(mentorid)
                    onEditMentorClick(event.target.value)
                }
            ).catch((error) => { setErrorMessage(`${[error.message]}`) })
        } else {
            setFormInvalid("Please complete the form")
        }
    }


    const handleSelectRankChange = (event) => {
        setSelectedRank(event.target.value)
        console.log(event.target.value)
        setMentorDetails({
            ...mentordetails,
            rank: event.target.value
        })
    }

    const handleSelectStatusChange = (event) => {
        setSelectedStatus(event.target.value)
        setMentorDetails({
            ...mentordetails,
            onboarding_status: event.target.value
        })
    }

    return (

        <div className="edit-mentor-container">
            {mentordetails ?
                <div> <h2>{mentordetails?.first_name} {mentordetails?.last_name}</h2>
                    <div className="mentor-information">
                        <div>
                        <div className="contact-deets">
                        <p><span className="span-mentor-info ">Mobile:</span> {mentordetails?.mobile}</p>
                        <p><span className="span-mentor-info ">Email:</span> <a href={mentordetails?.email}>{mentordetails?.email}</a> </p>
                        </div>
                        <div className="locations">
                        <p><span className="span-mentor-info ">Location: </span>{mentordetails?.location}  </p>
                        <p id="skills"><span className="span-mentor-info "> Skills:</span>{mentordetails.skills ? <div className="mentor-skills">
                            {mentordetails.skills?.map((skill, key) => {
                                return (<p>{skill?.name}</p>)
                            })} </div> : <>No skills selected</>}
                        </p>
                        </div>
                        <div className="user-status">
                        <p><span className="span-mentor-info ">Has mentored before? </span>  {mentordetails?.has_mentored ? 'Yes' : 'No'}</p>
                        <p><span className="span-mentor-info ">Available to mentor? </span>{mentordetails?.is_active ? 'Yes' : 'No'}</p>
                        </div>
                        </div>
                        <div className="socials-links">
                        <a href={mentordetails?.github_profile}>GitHub Link</a>
                        <a href={mentordetails?.linkedin_account}>LinkedIn Account</a>
                        <a href={mentordetails?.linkedin_account}>Socials Account</a>
                        </div>
                    </div>
                </div>
                :
                <>Mentor Details Loading</>
            }
            <section className="dashboard-mentor-details-events">
                <div className="previous-mentored">
                    <p>Previously mentored at: </p>
                    {mentorevents.filter(key => (key.mentor_id == activeMentor && key.confirmed == true)).length > 0 ?
                        <>{mentorevents.filter(key => (key.mentor_id == activeMentor && key.confirmed == true)).map((mentorEvents, key) => {

                            const mentorEventDetails = events.find(eventDetails => (eventDetails.id === mentorEvents.event_id))
                            return (
                                <div key={key}>
                                    {mentorEventDetails ?
                                        <div>
                                            <li onClick={handleNavigate} value={mentorEventDetails.id} className="event-details">{mentorEventDetails.title}</li>
                                        </div>
                                        : <div>No events</div>}
                                </div>
                            )
                        })
                        }</> :
                        <p>No events</p>
                    }

                </div>
                <div className="registered-mentored">
                    <p>Registered to mentor at: </p>
                    {mentorevents.filter(key => (key.mentor_id == activeMentor)).length > 0 ?
                        <>{mentorevents.filter(key => (key.mentor_id == activeMentor)).map((mentorEvents, key) => {

                            const mentorEventDetails = events.find(eventDetails => (eventDetails.id === mentorEvents.event_id))
                            return (
                                <div key={key}>
                                    {mentorEventDetails ?
                                        <div>
                                            <li onClick={handleNavigate} value={mentorEventDetails.id} className="event-details">{mentorEventDetails.title}</li>
                                        </div>
                                        : <div>No events</div>}
                                </div>
                            )
                        })
                        }</> :
                        <p>No events</p>
                    }
                </div>
            </section>
            <form className="edit-mentor-form">
                <div className="drop-downs">
                    <div>
                        <p className="rank">Mentor Rank: </p>
                        <select onChange={handleSelectRankChange} value={mentordetails?.rank}>
                            <option value={""}>Select from options...</option>
                            {ranks.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="onboarding-status">Onboarding Status:</p>
                        <select onChange={handleSelectStatusChange} value={mentordetails?.onboarding_status}>
                            <option value={"Applied"}>Select from options...</option>
                            {statuses.map((currentValue, index) => (
                                <option key={index} value={currentValue}>
                                    {currentValue}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="input-area">
                    <label htmlFor="private_notes">Private Notes</label>
                    {mentordetails?.private_notes == null ?
                        <textarea rows='5' cols='6' id="private_notes" placeholder="Any comments or notes about mentor?" onChange={handleChange}></textarea>
                        :
                        <textarea rows='5' cols='6' id="private_notes" onChange={handleChange} value={mentordetails?.private_notes}></textarea>
                    }

                </div>
                <div>
                    <button id="edit-mentor-submit" type="submit" onClick={handleSubmit} value="false">Confirm Edits</button>
                </div>
                <div>
                    <p>{errorMessage}</p>
                    <sub className={errorMessage ? "" : "hidden"}></sub>
                    <p>{formInvalid}</p>
                </div>
            </form>

        </div>
    );
}
export default EditMentorForm   