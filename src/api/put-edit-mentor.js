async function putEditMentor(
    username, 
    first_name, 
    last_name, 
    email, 
    mobile,
    location,
    is_active, 
    onboarding_status,
    rank,
    private_notes,
    github_profile,
    has_mentored
    ){
    const url = `${import.meta.env.VITE_API_URL}/users/${id}/`;
    
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
        "username":username, 
        "first_name": first_name, 
        "last_name":last_name, 
        "email": email, 
        "moile": mobile,
        "location": location,
        "is_action": is_active, 
        "onboarding_status": onboarding_status,
        "rank": rank,
        "private_notes": private_notes,
        "github_profile": github_profile,
        "has_mentored ": has_mentored
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to update event`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data ?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default putEditMentor