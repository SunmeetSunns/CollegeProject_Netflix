import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase.config';
import backgroundImage from '../assets/home.jpg';
import Movielogo from'../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {getAllMoviesData} from '../store'
import Slider from '../components/Slider';





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
        <Container>
            
            <Navbar isScrolled={isScrolled}/>
          <div className="hero">
            <img src={backgroundImage} alt='img' className='background-image'/>
            <div className="container">
                <div className="logo">
                    <img src={Movielogo} alt='movie-logo'/>
                </div>
                <div className="buttons flex">
                    <button className='flex j-center a-center' onClick={()=>navigate('/player')}>
                        <FaPlay/>Play
                    </button>
                    <button className='flex j-center a-center'>
                        <AiOutlineInfoCircle/>More Info
                    </button>
                </div>
            </div>
          </div>
       <Slider movies={movies}/>
        </Container>
       
    );
}

export default Netflix;


const Container=styled.div`
    background-color: black;
    .hero{
        position: relative;
        .background-image{
            filter: brightness(60%);
        }
        img{
            height: 100vh;
            width: 100vw;
        }
        .container{
            position: absolute;
            bottom: 5rem;
            .logo{
                img{
                    width: 100%;
                    height: 100%;
                    margin-left: 5rem;
                }
            }
            .buttons{
                margin: 5rem;
                gap: 2rem;
                button{
                    font-size: 1.4rem;
                    border-radius: 0.2rem;
                    gap: 1rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s ease-in-out;
                    &:hover
                    {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2){
                        background-color: rgba(109,109,110,0.7);
                        color: white;
                        svg{
                            font-size: 1.8rem;
                        }
                    }
                }

            }
        }
    }
`;