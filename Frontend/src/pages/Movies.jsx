import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {getAllMoviesData,getAllGenres} from '../store';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase.config';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable'
import SelectGenre from '../components/SelectGenre';

const Movies = () => {
    const dispatch = useDispatch();
    var movies;
    movies=[];
    movies = useSelector((state) => state.netflix.movies);
   // Select genres from Redux store
    const movieGenres=useSelector((state)=>state.netflix.genres);
    useEffect(() => {
      dispatch(getAllMoviesData('')); // Dispatch the thunk to fetch data
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllGenres('')); // Dispatch the thunk to fetch data
      }, [dispatch]);
  
// console.log(movieGenres)
    const [isScrolled,setIsScrolled]=useState(false);
    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset===0?false:true);
        return ()=>(window.onscroll=null);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (!currentUser) navigate('/login')
    })
    return (
       <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
      </div>
     
      <div className="data">
      <SelectGenre genres={movieGenres}/>
        {movies.length ? <Slider movies={movies}/>:
        <NotAvailable/>
        }
      </div>
       </Container>
    );
}

export default Movies;

const Container=styled.div`
.data{
    margin-top: 8rem;
    .not-available{
        text-align: center;
        color: white;
        margin-top: 4rem;
    }
}
`;
