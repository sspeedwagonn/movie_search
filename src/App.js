import { useState, useEffect } from 'react'
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from './MovieCard';

const API_URL="https://www.omdbapi.com?apikey=27a5a0a4"
const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Attack');
    }, []);
  return (
    <div className='app'>
        <h1>Movie Search</h1>

        <div className='search'>
            <input placeholder="Search for a movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)}/>
        </div>

        {movies?.length > 0
            ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found!</h2>
                </div>
            )
        }
    </div>
  );
}

export default App;