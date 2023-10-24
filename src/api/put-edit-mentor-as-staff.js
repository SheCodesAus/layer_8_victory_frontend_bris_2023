async function putEditMentorAsStaff(id, onboarding_status,rank,private_notes, skills, is_active ){

    const url = `${import.meta.env.VITE_API_URL}/users/${id}/`;

    console.log("here", id, onboarding_status,rank,private_notes, skills )
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")
    const body = {
        "onboarding_status": onboarding_status,
        "rank": rank,
        "private_notes": private_notes,
        "skills": skills,
        "is_active": is_active
    }

    for (let bod in body) {
        if (body[bod] == ""){
            delete body[bod]
          }
        }

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        const fallbackError = `Error trying to update mentor`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data.private_notes ?? fallbackError
        console.log(errorMessage)
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default putEditMentorAsStaff