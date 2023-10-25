import { useState } from "react";
import postCreateEvent from "../../api/post-create-event";
import useEvents from '../../hooks/use-events'
import './CreateEventForm.css'

// --- Needs authentication handling to check token belongs to staff ---///

function CreateEventForm({ createEventOpen, onCreateEventClick, activeEvent, onChangeActiveEvent }) {


    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]

    const [selectedLocation, setSelectedLocation] = useState('Brisbane')

    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    const [eventdetails, setEventDetails] = useState({
        title: "",
        start_date: "",
        end_date: "",
        location: "Brisbane",
        is_published: "",
    })

    const handleChange = (event) => {
        // if (auth.token){
        const { id, value } = event.target;
        setEventDetails((prevDetails) => ({
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
        if (eventdetails.title && eventdetails.start_date && eventdetails.end_date && eventdetails.location && eventdetails.is_published) {
            postCreateEvent(
                eventdetails.title,
                eventdetails.start_date,
                eventdetails.end_date,
                eventdetails.location,
                eventdetails.is_published
            ).then(
                (response) => {

                    const eventid = response.id

                    onChangeActiveEvent(eventid)
                    onCreateEventClick(event.target.value)

                }

            ).catch((error) => { setErrorMessage(`${[error.message]}`) })

        } else {
            setFormInvalid("Please complete the form")
        }
        // } else {
        //     setFormInvalid("Must be staff to create an event")
        // }


    }

    const handleSelectChange = (event) => {
        setSelectedLocation(event.target.value)
        setEventDetails({
            ...eventdetails,
            location: event.target.value
        })
    }

    const handleRadioChange = (event) => {
        setEventDetails({
            ...eventdetails,
            is_published: event.target.value
        })
    }

    return (

        <div className="create-event-container">
            <div className="create-event-header">
                <div className="user-banner">
                    <h2>Create an Event</h2>
                    <h3>Enter details below</h3>
                </div>
            </div>
            <form className="form-create-event">
                <div className="form-field">
                    <label htmlFor="title">Event Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter a title for the event"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="start_date">Start Date:</label>
                    <input type="date" id="start_date" placeholder="02-10-2023" onChange={handleChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="end_date">End Date:</label>
                    <input type="date" id="end_date" placeholder="02-10-2023" onChange={handleChange} />
                </div>
                <div className="form-field">
                    <div className="location-label">Location?</div>
                    <select className="event-location-create" value={selectedLocation} onChange={handleSelectChange}>
                        {locations.map((item) => {
                            return (<option key={item} value={item}>{item}</option>)
                        })}
                    </select>
                </div>
                <div className="form-field-radios" >
                    <label htmlFor="is_published">Publish event?</label>
                    <div className="radios">
                        <div className="radio-button">
                            <input type="radio" value="true" name="is_published" onChange={handleRadioChange} />
                            <p>Yes</p>
                        </div>
                        <div className="radio-button">
                            <input type="radio" value="false" name="is_published" onChange={handleRadioChange} />
                            <p>No</p>
                        </div>
                    </div>
                </div>
                <div className="create-submit-cont">
                    <button id="create-submit" type="submit" onClick={handleSubmit} value="false">Create Event</button>
                </div>
                <div>
                    <p>{errorMessage}</p>
                    <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>

                </div>
            </form>
        </div>);
}
export default CreateEventForm   