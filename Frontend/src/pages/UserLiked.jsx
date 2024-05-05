import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikedMovies } from '../store';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase.config';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

export default function UserLiked() {
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    })
    const dispatch = useDispatch();
    var movies;
    movies = [];
    movies = useSelector((state) => state.netflix.movies);
    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [email, dispatch]);

    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                {Array.isArray(movies) && (
                    <div className="grid flex">
                        {movies.map((movie, index) => (
                            <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                        ))}
                    </div>
                )}

            </div>

        </Container>
    )
}
const Container = styled.div`
.content{
    margin: 2.3rem;
    margin-top: 8rem;
    gap:3rem;
    h1{
        margin-left: 3rem;
    }
    .grid{
        flex-wrap: wrap;
        gap:1rem;
    }
}
`;