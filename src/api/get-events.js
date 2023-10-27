async function getEvents() {
  const url = `${import.meta.env.VITE_API_URL}/events/`;
  const token = window.localStorage.getItem("token");
  if (token != undefined) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
    if (!response.ok) {
      const fallbackError = "Error fetching events";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMessage = data ?? fallbackError;
      throw new Error(errorMessage);
    }
    return await response.json();
  } else {
    const response = await fetch(url, { method: "GET" });
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
}
export default getEvents;
