import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { API_KEY,  YT_API_KEY ,BACKEND_URL} from '../utils/constansts';
import axios from 'axios';


const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};





// export const fetchTrailersForMovies = async (imdbID) => {
//   try {
//     const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//         q: `${imdbID} trailer`,
//         key: YT_API_KEY,
//         part: 'snippet',
//         type: 'video',
//         maxResults: 1,
//       },
//     });

//     // Check if response has items
//     if (response.data.items && response.data.items.length > 0) {
//       // Extract the video ID from the response
//       const videoId = response.data.items[0].id.videoId;
//       // Return the video URL
//       return `https://www.youtube.com/watch?v=${videoId}`;
//     } else {
//       // No trailer found for this IMDb ID
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching trailer:', error);
//     throw error;
//   }
// };






export const getGenres = createAsyncThunk('netflix/genres', async (imdbIDs) => {
  try {
    // Create an array to store the genres of all movies
    const requests = imdbIDs.map(imdbID => {
      return axios.get(`${BACKEND_URL}/api/omdbProxy/movie/${imdbID}`, {
        params: {
          apikey: API_KEY, // Include API key as a query parameter
        }
      });
    });

    // Concurrently fetch data for all movies
    const responses = await Promise.all(requests);

    // Parse response JSON for each movie
    const genres = responses.map(response => response.data);
    // Call getAllRawData to further process the genres data if needed
    const movieArray = getAllRawData(genres);
    // Return the genres array as the payload
    return movieArray;

  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
});




const getAllRawData = (array) => {
  var movieArray = []
  if(array==="null"){
    movieArray=[]
  }
  else{
    array.forEach((movie) => {
      if (movie.Poster
      ) {
        movieArray.push({
          id: movie.imdbID,
          name: movie.Title,
          image: movie.Poster,
          plot: movie.Plot,
          rating: movie.imdbRating,
          genres: movie.Genre.split(', ')
  
        })
      }
      
    })
  }

 return movieArray
}
export const getAllMoviesData = createAsyncThunk('netflix/genres_id', async (genre, thunkAPI) => {
  var url;
  var no_of_hit;  
  if(genre===''){
    url='https://moviesminidatabase.p.rapidapi.com/movie/order/byPopularity/';
  }
  else{
    genre=genre.genres
    url = `https://moviesminidatabase.p.rapidapi.com/movie/byGen/${genre}/`;
 
  }
 const options = {
    method: 'GET',
    url: url,
    headers: {
      'X-RapidAPI-Key': '0bd14eb2cdmshc74f7d07120123ep1eadd7jsnfd2042092d20',
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    if(genre===''){
      no_of_hit=response?.data?.results?.length
    }
    else{
      no_of_hit=20;
    }
    if(response?.data?.count!==0){
      const id_s = []
      for (let i = 0; i < no_of_hit; i++) {
        id_s.push(response.data.results[i].imdb_id
        )
      }
      thunkAPI.dispatch(getGenres(id_s));
    }
    else{
      getAllRawData("null")
    }
   
    // fetchTrailersForMovies(id_s);

  
    

  } catch (error) {
    console.error(error);
  }

});
export const getMovieBySearch = createAsyncThunk('netflix/search', async (searchItem,thunkAPI) => {
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${searchItem}`,

    headers: {
      'X-RapidAPI-Key': '0bd14eb2cdmshc74f7d07120123ep1eadd7jsnfd2042092d20',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response)
    if(response?.data?.entries!==0){
      const id_s = []
      for (let i = 0; i < response?.data?.entries; i++) {
       
        id_s.push(response.data?.results[i].id)
       
        
        
      }
      thunkAPI.dispatch(getGenres(id_s));
    }
    else{
      getAllRawData("null")
    }
   
    return response.data; // Return the fetched data
  } catch (error) {
    throw error; // Throw error so it can be caught by the caller
  }
});
export const getAllSeriesData = createAsyncThunk('netflix/genres_series', async (genre, thunkAPI) => {
  var url;
  var no_of_hit;  
  if(genre===''){
    url='https://moviesminidatabase.p.rapidapi.com/series/order/byPopularity/';
  }
  else{
    genre=genre.genres
    url = `https://moviesminidatabase.p.rapidapi.com/series/byGen/${genre}/`;
 
  }
 const options = {
    method: 'GET',
    url: url,
    headers: {
      'X-RapidAPI-Key': '0bd14eb2cdmshc74f7d07120123ep1eadd7jsnfd2042092d20',
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    if(genre===''){
      no_of_hit=response?.data?.results?.length
    }
    else{
      no_of_hit=20;
    }
    const id_s = []
    for (let i = 0; i < no_of_hit; i++) {
      id_s.push(response.data.results[i].imdb_id
      )
    }
    thunkAPI.dispatch(getGenres(id_s));
    // fetchTrailersForMovies(id_s);

  
    

  } catch (error) {
    console.error(error);
  }

});
export const getMovieVideo=createAsyncThunk('netflix/getVideo',async(id)=>{
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get',
    params: {
      output_language: 'en',
      imdb_id: id
    },
    headers: {
      'X-RapidAPI-Key': '0bd14eb2cdmshc74f7d07120123ep1eadd7jsnfd2042092d20',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    // return response.data?.
    return response.data?.result?.streamingInfo
    
  } catch (error) {
    console.error(error);
  }
})

export const getUserLikedMovies=createAsyncThunk('netflix/getLiked',async(email)=>{
  const {data:{movies}}=await axios.get(`https://collegeproject-netflix.onrender.com/api/user/liked/${email}`)
  return movies;
}
)


export const removeFromLikedMovies = createAsyncThunk(
  'netflix/deleteLiked',
  async ({ movieId, email }) => {
  
    const { data: { movies } } = await axios.put(`https://collegeproject-netflix.onrender.com/api/user/delete`, { movieId, email });
    return movies;
  }
);
export const fetchTrailersForMovies =createAsyncThunk('netflix.video',async(id)=>{
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: `${id} trailer`,
        key: YT_API_KEY,
        part: 'snippet',
        type: 'video',
        maxResults: 1,
      },
    });

    // Check if response has items
    if (response.data.items && response.data.items.length > 0) {
      // Extract the video ID from the response
      const videoId = response.data.items[0].id.videoId;
      // Return the video URL
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      // No trailer found for this IMDb ID
      return null;
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
    throw error;
  }

})
export const getAllGenres = createAsyncThunk('netflix/genres_mov', async ( thunkAPI) => {
const options = {
  method: 'GET',
  url: 'https://moviesminidatabase.p.rapidapi.com/genres/',
  headers: {
    'X-RapidAPI-Key': '0bd14eb2cdmshc74f7d07120123ep1eadd7jsnfd2042092d20',
    'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
  }
};

  try {
    const response = await axios.request(options);
   
    return response.data.results

   
  } catch (error) {
    console.error(error);
  }

});
// Call the getAllMoviesData function
const NetflixSlice = createSlice({
  name: 'Netflix',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
     
      state.movies = action.payload;
      state.genresLoaded = true;
      
    })
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
     
      state.genres = action.payload;
      state.genresLoaded = true;
      
    })
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
     
      state.movies = action.payload;
      
      
    })
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
     
      state.movies = action.payload;
    })
    builder.addCase(getMovieBySearch.fulfilled,(state,action)=>{
      state.movies=action.payload;
    })
    builder.addCase(fetchTrailersForMovies.fulfilled,(state,action)=>{
      state.video=action.payload
    })
   
  }

});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
})
