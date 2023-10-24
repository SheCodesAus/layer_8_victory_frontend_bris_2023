async function postCreateEvent(title, start_date, end_date, location, is_published){
    const url = `${import.meta.env.VITE_API_URL}/events/`;
    
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "title": title,
            "start_date": start_date,
            "end_date": end_date,
            "location": location,
            "is_published": is_published
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to create event`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data ?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default postCreateEvent