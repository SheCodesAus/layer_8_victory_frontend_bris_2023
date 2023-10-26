async function putUser(
    id,
    username, 
    first_name, 
    last_name, 
    email, 
    mobile,
    location,
    github_profile,
    social_account,
    linkedin_account,
    has_mentored,
    skills
    ){
    const url = `${import.meta.env.VITE_API_URL}/users/${id}/`;
    console.log(has_mentored)
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")
    const body = {
        "username":username, 
        "first_name": first_name, 
        "last_name": last_name, 
        "email": email, 
        "mobile": mobile, 
        "location": location, 
        "github_profile": github_profile,
        "social_account": social_account,
        "linkedin_account": linkedin_account,
        "has_mentored": has_mentored, 
        "skills":skills,
    }
    console.log({...body})
    for (let bod in body) {
        if (body[bod] === ""){
            delete body[bod]
          }
        }
    console.log({...body})
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

        const errorMessage = data?.detail ?? data?.username ?? data?.skills ?? data?.first_name ?? data?.last_name ?? data?.is_active ?? data?.onboarding_status?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default putUser