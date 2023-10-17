import "./Event_card.css";
import { useState } from 'react'
import {Link} from 'react-router-dom'

function EventCard(props) {

const {eventData} = props
console.log(eventData, "in card")

const eventLink = `event/${eventData.id}`


return(
    <>
    <div className="card">
        
        <Link to={eventLink}>
        <h2>{eventData.title}</h2>
        <p>Date: {eventData.start_date}</p>
        <p>Location: {eventData.location}</p>
        <p>Created by: {eventData.created_by}</p>
        <p>Published: {eventData.is_published.toString()}</p>
        </Link>
    </div>
    </>
)
}

export default EventCard;