async function putMentorEvents(id, confirmed, available) {

    const url = `${import.meta.env.VITE_API_URL}/mentor-events/${id}/`
    
    const token = window.localStorage.getItem("token")
    const body = {
        "confirmed": confirmed,
        "available" : available
    }

    for (let bod in body) {
        if (body[bod] == ""){
            delete body[bod]
          }
        }
    console.log('putting', id, confirmed)
    const response = await fetch(url, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const fallbackError = "Error fetching event mentors";
    

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage)
    }
    
return await response.json();

}

export default putMentorEvents;