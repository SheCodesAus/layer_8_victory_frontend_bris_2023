import { useEffect, useState } from "react";
import putEditEvent from "../../api/put-edit-event";
import useEvents from '../../hooks/use-events'
import './EditEventsForm.css'

// TODO Needs authentication handling to check token belongs to staff 

function EditEventForm({ editEventOpen, onEditEventClick, activeEvent, onChangeActiveEvent }) {

    const { events, isEventsLoading, isEventsError } = useEvents()

    const locations = ["Brisbane", "Sydney", "Melbourne", "Adelaide", "Perth", "Canberra", "Darwin"]
    const [selectedLocation, setSelectedLocation] = useState('Brisbane')

    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    
    const [eventdetails, setEventDetails] = useState({
        id: activeEvent,
        title: "",
        start_date: "",
        end_date: "",
        location: "Brisbane",
        is_published: "",
    })

   
    useEffect(() => {
        setEventDetails(events.find(event => event.id == activeEvent))
    }, [events, activeEvent])

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
        if (eventdetails.id && eventdetails.title && eventdetails.start_date && eventdetails.end_date && eventdetails.location && eventdetails.is_published) {
            putEditEvent(
                eventdetails.id,
                eventdetails.title,
                eventdetails.start_date,
                eventdetails.end_date,
                eventdetails.location,
                eventdetails.is_published
            ).then(
                (response) => {
                    const eventid = response.id
                    onChangeActiveEvent(eventid)
                    onEditEventClick(event.target.value)
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


    //TODO should be utils
    const parseDate=(str_date)=> {
        const formattedDate = new Date(str_date)      
        return formattedDate.toLocaleDateString("sv-SE")
    }

    return (
        <div className="edit-event-container">
            <div className="edit-event-header">
                <div className="user-banner">
                    {eventdetails ?
                        <h2>{eventdetails.title}</h2>
                        :
                        <>Loading details</>
                    }
                    <h3>Update the event details below</h3>
                </div>
            </div>

            <form className="form-edit-event">
                <div className="form-field">
                    <label htmlFor="title">Event Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={eventdetails?.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="start_date">Start Date:</label>
                    <input type="date" id="start_date" onChange={handleChange} value={parseDate(eventdetails?.start_date)} />
                </div>
                <div className="form-field">
                    <label htmlFor="end_date">End Date:</label>
                    <input type="date" id="end_date" value={parseDate(eventdetails?.end_date)} onChange={handleChange} />
                </div>
                <div className="form-field">
                    <div className="location-label">Location?</div>
                    <select className="event-location" value={eventdetails?.location} onChange={handleSelectChange}>
                        {locations.map((item) => {
                            return (<option key={item} value={item}>{item}</option>)
                        })}
                    </select>

                </div>
                <div className="form-field-radios" >
                    <label htmlFor="is_published">Publish event?</label>
                    <div className="radios">
                        <div className="radio-button">
                            <input type="radio" value="true" name="is_published" onChange={handleRadioChange}/>
                            <p>Yes</p>
                        </div>
                        <div className="radio-button">
                            <input type="radio" value="false" name="is_published" onChange={handleRadioChange} />
                            <p>No</p>
                        </div>
                    </div>
                </div>
                <div className="confirm-submit-cont">
                    <button id="confirm-submit" type="submit" onClick={handleSubmit} value="false">Confirm Edits</button>
                </div>
                <div>
                    <p>{errorMessage}</p>
                    <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>

                </div>
            </form>
        </div>);
}
export default EditEventForm   