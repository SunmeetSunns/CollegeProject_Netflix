import React from 'react';
import Cardslider from './Cardslider';

export default
React.memo( function Slider({movies}) {
  
    const getMoviesFromRange=(from,to)=>{
        if (Array.isArray(movies)) {
            return movies.slice(from, to);
          } else {
            // Handle the case where movies is not an array
            
            return [];
          }
        
    }
    return (
        
        <div>
        {getMoviesFromRange(0, 10).length > 0 && (
          <Cardslider title="Trending Now" data={getMoviesFromRange(0, 10)} id="1" />
        )}
        {getMoviesFromRange(10, 20).length > 0 && (
          <Cardslider title="New Releases" data={getMoviesFromRange(10, 20)} id="2" />
        )}
        {getMoviesFromRange(20, 30).length > 0 && (
          <Cardslider title="Blockbuster Movies" data={getMoviesFromRange(20, 30)} id="3" />
        )}
        {getMoviesFromRange(30, 40).length > 0 && (
          <Cardslider title="Netflix Popular" data={getMoviesFromRange(30, 40)} id="4" />
        )}
        {getMoviesFromRange(40, 50).length > 0 && (
          <Cardslider title="Action" data={getMoviesFromRange(40, 50)} id="5" />
        )}
      </div>
    );
  
});
