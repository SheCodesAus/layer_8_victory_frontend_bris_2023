async function putEditMentorAsStaff(
    id,
    onboarding_status,
    rank,
    private_notes, 
    skills
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
        "onboarding_status": onboarding_status,
        "rank": rank,
        "private_notes": private_notes,
        "skills": skills
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to update mentor`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data ?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default putEditMentorAsStaff