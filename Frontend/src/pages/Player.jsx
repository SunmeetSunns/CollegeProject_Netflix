import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrailersForMovies } from '../store';
import video from '../assets/stranger.mp4'

const Player = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { movieId } = location.state || {}; 

    // Fetch the YouTube video link from Redux state
    const link = useSelector((state) => state.netflix.video);

    useEffect(() => {
        if (movieId) {
            dispatch(fetchTrailersForMovies(movieId));
        }
    }, [dispatch, movieId]);
    const navigate = useNavigate();

    // Extract video ID from the YouTube link
    const getYouTubeVideoId = (url) => {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
    };
    console.log("Link:", link);
    const videoId = link ? getYouTubeVideoId(link) : null;
    const videoSrc = link ? `https://www.youtube.com/embed/${videoId}` : video;
    


    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                {link ? (
                    <iframe
                        title="YouTube Video Player"
                        src={videoSrc}
                        allowFullScreen
                    ></iframe>
                ) : (
                    <video controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
        </Container>
    );
};

export default Player;

const Container = styled.div`
    .player{
    width: 100vw;
    height: 100vh;
    .back{
        position: relative;
        padding: 2rem;
        z-index: 1;
        svg{
            font-size: 3rem;
            cursor: pointer;
        }
    }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
            object-fit: cover;
        }
        video{
        height: 100vh;
        width: 100vw;
        object-fit: cover;
    }
    }
`;
