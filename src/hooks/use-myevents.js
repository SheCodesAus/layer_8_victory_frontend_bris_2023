import { useState, useEffect } from "react";
import getMyEvents from "../api/get-my-events";

export default function useMyEvents() {
	const [myEvents, setMyEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		getMyEvents()
			.then((myEvents) => {
				setMyEvents(myEvents);

				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	}, []);
	return [myEvents, isLoading, error];
}
