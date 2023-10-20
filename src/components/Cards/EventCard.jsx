import "./Event_card.css";
import { useState } from 'react'
import {Link} from 'react-router-dom'

function EventCard(props) {

const { eventData } = props
const eventLink = `event/${props.id}`


const formattedDateObj = new Date(eventData.start_date)

return(
    <>
    <div className="card">
        
        
        <h2>{eventData.title}</h2>
        <p>Date: {formattedDateObj.getDay()} / {formattedDateObj.getMonth()} / {formattedDateObj.getFullYear()}</p>
        <p>Location: {eventData.location}</p>
        <p>Created by: {eventData.created_by}</p>
        <p>Published: {eventData.is_published.toString()}</p>
        <Link to={eventLink}>See more</Link>
    </div>
    </>
)
}

export default EventCard;