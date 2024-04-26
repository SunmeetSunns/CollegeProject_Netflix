import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase.config';
import backgroundImage from '../assets/home.jpg';
import Movielogo from'../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {getAllMoviesData} from '../store'
import Slider from '../components/Slider';
import './Netflix.css'





const Netflix = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies); // Select genres from Redux store
  
    useEffect(() => {
      dispatch(getAllMoviesData('')); // Dispatch the thunk to fetch data
    }, [dispatch]);
  

    const [isScrolled,setIsScrolled]=useState(false);
    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset===0?false:true);
        return ()=>(window.onscroll=null);
    };
    const navigate=useNavigate();
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate('/login')
    })

    return (
       
            
            <div className="Container">
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img src={backgroundImage} alt="img" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <img src={Movielogo} alt="movie-logo" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex j-center a-center" onClick={() => navigate('/player')}>
                            <FaPlay />
                            Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle />
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </div>
       
       
    );
}

export default Netflix;


