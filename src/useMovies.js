import { useEffect, useState } from "react";

const KEY = '5c402c0dc3948c9f593c5ad0adcaf317'

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(function () {
		// callback?.()

		const controller = new AbortController()

		async function fetchMovies() {
			try {
				setIsLoading(true)
				setError('')

				const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`, { signal: controller.signal })

				if (!res.ok) throw new Error("Failed to fetch movies")

				const data = await res.json()
				if (data.results.length === 0) {
					throw new Error('No results')
				}

				setMovies(data.results)
				setError('')
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		if (query.length < 3) {
			setMovies([])
			setError('')
			return
		}

		fetchMovies()

		return function () {
			controller.abort()
		}
	}, [query])

	return { movies, isLoading, error }
}