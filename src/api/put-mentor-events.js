async function putMentorEvents(id, confirmed, available) {

    const url = `${import.meta.env.VITE_API_URL}/mentor-events/${id}/`  
    const token = window.localStorage.getItem("token")
    const response = await fetch(url, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        body: JSON.stringify({
            "confirmed": confirmed,
            "available": available,
        })
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