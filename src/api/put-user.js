async function putUser(
    id,
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
    has_mentored,
    skills,
    social_account,
    linkedin_account
    ){
    const url = `${import.meta.env.VITE_API_URL}/users/${id}/`;
    
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")
    const body = {
        "first_name": first_name, 
        "last_name": last_name, 
        "email": email, 
        "mobile": mobile, 
        "social_account": social_account,
        "linkedin_account": linkedin_account,
        "github_profile": github_profile, 
        "username":username, 
        "is_active": is_active, 
        "has_mentored": has_mentored, 
        "location": location, 
        "skills":skills,
        "onboarding_status": onboarding_status,
        "rank": rank,
        "private_notes": private_notes,
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
            Authorization: `Token ${token}`
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        const fallbackError = `Error trying to update profile`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data?.detail ?? data?.username ?? data?.skills ?? data?.first_name ?? data?.last_name ?? data?.is_active ?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default putUser