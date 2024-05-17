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
  const [movies, setMovies] = useState(tempMovieData);
  console.log(setMovies);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  );
}

function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  )
}

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && <MovieList movies={movies} />}
    </div>
  )
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
    </ul>
  )
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  console.log(setWatched);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
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
  )
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} />)}
    </ul>
  )
}

function WatchedMovie({ movie }) {
  return (
    <li>
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
  )
}