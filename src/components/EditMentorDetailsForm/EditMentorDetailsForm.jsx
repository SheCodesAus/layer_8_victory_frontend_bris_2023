import { useState } from "react"; 
import putEditMentor from "../../api/put-edit-mentor";
import useMentors from '../../hooks/use-mentors'
// import './EditEventsForm.css'

// // --- Needs authentication handling to check token belongs to staff ---///

function EditMentorForm({editMentorOpen, onEditMentorClick, activeMentor, onChangeActiveMentor}) {
    const {mentors, isMentorsLoading, isMentorsError } = useMentors()

    //const locations = [ "Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra",  "Darwin"]

    //const [selectedLocation, setSelectedLocation] = useState('Brisbane')

    const [selectedRank, setSelectedRank] = useState("")
    
    const statuses = [ "Applied","Validated","Interviewed","Ranked","Accepted","Onboarded","Ready" ]
    
    const [selectedStatus, setSelectedStatus] = useState("")

    const ranks = ["Junior","Mid-level","Lead"]

    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    const [mentordetails, setMentorDetails] = useState({
        id: activeMentor,
        onboarding_status: "",
        rank: "",
        private_notes: "",
    })

    const handleChange = (event) => {
        // if (auth.token){
        const {id, value} = event.target;
        setMentorDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
    // }   else {
    //     setFormInvalid("Must be staff to create an event")
    // }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // if (auth.token){
            if(mentordetails.id && mentordetails.onboarding_status && mentordetails.rank && mentordetails.private_notes ) {
                putEditEvent(
                    mentordetails.id,
                    mentordetails.onboarding_status,
                    mentordetails.rank,
                    mentordetails.private_notes,
                ).then(
                    (response) => {
                            const mentorid = response.id 
                            onChangeActiveMentor(mentorid)
                            onEditMentorClick(event.target.value)
                            }
                ).catch((error)=>{setErrorMessage(`${[error.message]}`)})
                
            } else {
                setFormInvalid("Please complete the form")
            }
        // } else {
        //     setFormInvalid("Must be staff to create an event")
        // }
        

        }


        const handleSelectRankChange = (event) => {

            setSelectedRank(event.target.value)

            setMentorDetails({...mentordetails,
                rank: event.target.value
            })
        }

       const handleSelectStatusChange = (event) => {
        setMentorDetails({...mentordetails,
            onboarding_status: event.target.value
        })
        }

    return(

        <div className="edit-mentor-container">
        <div className="edit-mentor-header">
                <div className="user-banner">
                <h2>Updating: {activeMentor}</h2>
                <h3>{mentor.first_name}{mentor.last_name}</h3>
                </div>
            </div>

            <form className="form-edit-mentor">
                    <div className="form-field">
                        <label htmlFor="title">Mentor Name:</label>
                        <input 
                            type="text"
                            id="title"
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="start_date">Start Date:</label>
                        <input type="date" id="start_date" placeholder={event.start_date} onChange={handleChange} />
                    </div> 
                    <div className="form-field">
                        <label htmlFor="end_date">End Date:</label>
                        <input type="date" id="end_date" placeholder={event.end_date} onChange={handleChange} />
                    </div> 
                    <div className="form-field">
                    <div className="location-label">Location?</div>
                    <select className="event-location" value={selectedLocation} onChange={handleSelectChange}>
                            {locations.map((item)=>{
                                return(<option key={item} value={item}>{item}</option>)
                            })}
                        </select>
                        {/* <label htmlFor="location">Location:</label>
                        <input type="text" id="location" placeholder="Location" onChange={handleChange} /> */}
                    </div> 
                    <div className="form-field-radios" >
                        <label htmlFor="is_published">Publish event?</label>
                        <div className="radios">
                            <div className="radio-button">
                            <input type="radio" value="true" name="is_published" onChange={handleRadioChange} /> 
                            <div>Yes</div>
                            </div>
                            <div className="radio-button">
                            <input type="radio" value="false" name="is_published" onChange={handleRadioChange} /> 
                            <div>No</div>
                            </div>
                        </div>
                    </div> 
                    <div className="create-submit-cont">
                    <button id="create-submit" type="submit" onClick={handleSubmit} value="false">Confirm Edits</button>
                    </div>
                    <div>
                        <p>{errorMessage}</p>
                        <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
                        
                    </div>
                </form>
    </div>);
}
export default EditEventForm   