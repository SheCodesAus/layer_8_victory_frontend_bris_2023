async function postCreateAccount(first_name, last_name, email, mobile, social_account, linkedin_account, github_profile, username, password, has_mentored, location, skills) {

    const url = `${import.meta.env.VITE_API_URL}/users/`;
   
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            "first_name": first_name, 
            "last_name": last_name, 
            "email": email, 
            "mobile": mobile, 
            "social_account": social_account,
            "linkedin_account": linkedin_account,
            "github_profile": github_profile, 
            "username":username, 
            "password":password, 
            "has_mentored": has_mentored, 
            "location": location, 
            "skills":skills,
        }),
    });
    console.log(response)

    if (!response.ok) {
        const fallbackError = `Error trying to create the account`;
    
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
    
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default postCreateAccount;