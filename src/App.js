import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/I/71L0N7Ql0iL._AC_SY879_@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1446714",
    Title: "Prometheus",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/I/81Xk9a-6QEL.__AC_SX300_SY300_QL70_ML2_@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0278781",
    Title: "Andromeda Nebula",
    Year: "1967",
    Poster:
      "https://m.media-amazon.com/images/I/515COd2Y0QL._SX466_@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/I/71L0N7Ql0iL._AC_SY879_@._V1_SX300.jpg",
    runtime: 239,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt1446714",
    Title: "Prometheus",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/I/81Xk9a-6QEL.__AC_SX300_SY300_QL70_ML2_@._V1_SX300.jpg",
    runtime: 224,
    imdbRating: 7.0,
    userRating: 10,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {movies?.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}
