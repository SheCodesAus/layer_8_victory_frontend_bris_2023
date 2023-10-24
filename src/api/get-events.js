async function getEvents() {

    const url = `${import.meta.env.VITE_API_URL}/events/`;
    const response = await fetch(url, { method: "GET" });
    console.log("What is URL ", response)
    
    if (!response.ok) {
        const fallbackError = "Error fetching events";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data ?? fallbackError;
        throw new Error(errorMessage); 
    }
    return await response.json(); 
    }
    export default getEvents;