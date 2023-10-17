async function getEvents() {

    const url = `${import.meta.env.VITE_API_URL}/events`

    const response = await fetch(url, { method: "GET"});

    if (!response.ok) {
        const fallbackError = "Error fetching riders";
    

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage)
    }
    
return await response.json();

}

export default getEvents;