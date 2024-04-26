import React, { useState, useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/navigation';
import 'swiper/css'
import {Navigation} from 'swiper/modules'



export default function Cardslider({ data, title ,id}) {
  const [showControls, setShowControls] = useState(false);
  const [swiper, setSwiper] = useState(null);


  useEffect(() => {
    setShowControls(true); // Show controls by default
  }, []);

  const handleNext = () => {
    swiper.slideNext(); // Slide to the next slide
  };

  const handlePrev = () => {
    swiper.slidePrev(); // Slide to the previous slide
  };
  const [swipesPerSlide, setSwipesPerSlide] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600 && window.innerWidth>480) {
                setSwipesPerSlide(2);
            } else if (window.innerWidth <= 480){
                setSwipesPerSlide(1);
            }
            else if (window.innerWidth >=600 && window.innerWidth<850){
              setSwipesPerSlide(3);
          }
          else if (window.innerWidth >=850 && window.innerWidth<1000){
            setSwipesPerSlide(4);
        }
            else{
              setSwipesPerSlide(6)
            }
        };


        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <Container
      className='flex column'
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <Swiper
          onSwiper={setSwiper} // Store swiper instance in state
          spaceBetween={10}
          slidesPerView={swipesPerSlide}
          navigation={{
            prevEl: `.slider-action-left-${id}`, // Use unique class for left control
            nextEl: `.slider-action-right-${id}`, // Use unique class for right control
          }}
        >
          {data.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <Card movieData={movie} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={` leftS slider-action slider-action-left-${id} ${showControls ? "" : "none"}`} onClick={handlePrev}>
          <AiOutlineLeft />
        </div>
        <div className={`rightS slider-action slider-action-right-${id} ${showControls ? "" : "none"}`} onClick={handleNext}>
          <AiOutlineRight />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
 gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 39px;
  }
  .wrapper {
    padding: 0em 2.5em;
    .slider-action {
      position: absolute;
      z-index: 99;
      top: 0;
      bottom: 0;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 2rem;
      }
    }
    .leftS {
      left: 0;
    }
    .rightS {
      right: 0;
    }
    .none {
      display: none;
    }
  }

`;