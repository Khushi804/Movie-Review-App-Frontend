import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import  Header  from './components/Header';
import Trailer from './components/Trailer';
import Reviews from './components/review/Reviews';

function App() {
  const [movies, setMovies] = useState([]); // Initialize as an empty array
    const[movie,setMovie] =useState([]);
    const[reviews,setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/movies");
      const data = await response.json(); // Parse the JSON response
     // console.log(data);
      setMovies(data); // Update state with fetched movies
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };


  const getMovieData =async (movieId)=>{
    try{
      const response = await fetch(`http://localhost:8081/api/v1/movies/${movieId}`);
      const singleData = await response.json(); // Parse the JSON response
     console.log(singleData);
     setMovie(singleData);
     
      
    }catch(err){
      console.error("Error fetching reviews:", err);
    }
    
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home movies={movies}/>}/>
      <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
      <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
      </Route> 

      
     </Routes>
    </div>
  );
}

export default App;