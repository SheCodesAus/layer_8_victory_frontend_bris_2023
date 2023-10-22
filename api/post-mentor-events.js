async function postMentorEvents(event_id, mentor_id) {

    const url = `${import.meta.env.VITE_API_URL}/mentor-events/`
    
    const token = window.localStorage.getItem("token")

    console.log("in post mentor events")
    console.log(event_id, mentor_id)


    const response = await fetch(url, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "event_id": event_id,
            "mentor_id": mentor_id
        })
    });

    if (!response.ok) {
        const fallbackError = "Error fetching event mentors";
    

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data ?? fallbackError;
        throw new Error(errorMessage)
    }
    
return await response.json();

}

export default postMentorEvents;