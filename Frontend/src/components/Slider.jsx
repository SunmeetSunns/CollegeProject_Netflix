import React from 'react';
import Cardslider from './Cardslider';

export default
React.memo( function Slider({movies}) {
  
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to)
    }
    return (
        
        <div>
            <Cardslider title="Trending Now" data={getMoviesFromRange(0,10)} id='1' />
            <Cardslider title="New Releases" data={getMoviesFromRange(10,20)} id='2'/>
            <Cardslider title="Blockbuster Movies" data={getMoviesFromRange(20,30)} id='3'/>
            <Cardslider title="Netflix Popular" data={getMoviesFromRange(30,40)} id='4'/>
            <Cardslider title="Action" data={getMoviesFromRange(40,50)} id='5'/>
           
           
        </div>
    );
  
});
