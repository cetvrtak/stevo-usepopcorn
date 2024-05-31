import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key)
		return storedValue ? JSON.parse(storedValue) : initialState
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, key])

	console.log(value, key);

	return [value, setValue]
}