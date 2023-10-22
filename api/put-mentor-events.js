async function putMentorEvents(id, is_deleted) {

    const url = `${import.meta.env.VITE_API_URL}/mentor-events/${id}/`
    
    const token = window.localStorage.getItem("token")


    console.log(url, is_deleted)
    const response = await fetch(url, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "is_deleted": is_deleted,

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