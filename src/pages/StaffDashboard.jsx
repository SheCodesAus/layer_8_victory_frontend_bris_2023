import { useState, useEffect } from 'react';
// import EventData from "../assets/data/events"
import useEvents from '../hooks/use-events'
import EventCard from '../components/Cards/EventCard'
import AssignMentors from '../components/AssignMentors/AssignMentors'
// import "../components/DonationPage.css"


function EventSearch() {

   const { events,  isEventsLoading, isEventsError } = useEvents(); 
   console.log(events, "in dashboard")

   const [searchTerm, setSearchTerm] = useState("")

   if (isEventsLoading){
        return<div>Events loading...</div>
    }

    if (isEventsError){
        return<div>{isEventsError.message}</div>
    }

    const aggregate = (arr,on, who) => {
        const agg = arr.reduce((a,b) => {
            const onValue = b[on]
            const whoValue = b[who]

            if(a[onValue]) {
                a[onValue] = {
                    [on]: onValue,
                    [who]: [...a[onValue][who], whoValue]
                }
            }
            else {
                a[onValue] ={
                    [on]: onValue,
                    [who]:[whoValue]
                }
            }
            return a;
        }, {})
        return Object.values(agg)
    }


    const handleChange = e => setSearchTerm(e.target.value)

    return (
        <div className='container-apply'>
            
            <input className='search-box'
                type='text' 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder='Find an event'>
            </input>
    
            <div>
                <ul>
                {events.sort((a,b) => {
                 return b.start_date - a.start_date
                }).filter(o => o.title.includes(searchTerm)).map((eventData, key) => {

                    const formattedDateObj = new Date(eventData.start_date)
                    
            
                 
                        
                    return(
                    <li key={key}>
                        {eventData.title} {formattedDateObj.getDay()}/{formattedDateObj.getMonth()}/{formattedDateObj.getFullYear()}
                        
                        
                    </li>



                
                    
                    )
                })}
                </ul>

            </div>



            </div>
    
        )

}

export default EventSearch