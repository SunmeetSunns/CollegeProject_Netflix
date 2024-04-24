import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { API_KEY, OMDB_BASE_URL, YT_API_KEY } from '../utils/constansts';
import axios from 'axios';


const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};





export const fetchTrailersForMovies = async (imdbIDs) => {
  try {
    // Slice the array to include only the first 10 IMDb IDs
    const imdbIDsToProcess = imdbIDs.slice(0, 10);
    
    const trailers = {};

    for (const imdbID of imdbIDsToProcess) {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: imdbID + ' trailer',
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
        // Store the video ID in the trailers object using the IMDb ID as key
        trailers[imdbID] = `https://www.youtube.com/watch?v=${videoId}`;
      } else {
        // No trailer found for this IMDb ID
        trailers[imdbID] = null;
      }
    }
console.log(trailers)
    return trailers;
  } catch (error) {
    console.error('Error fetching trailers:', error);
    throw error;
  }
};






export const getGenres = createAsyncThunk('netflix/genres', async (imdbIDs) => {
  try {
    // Create an array to store the genres of all movies
    const requests = imdbIDs.map(imdbID => {
      return axios.get(OMDB_BASE_URL, {
        params: {
          i: imdbID, // IMDb ID of the movie
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

export const getUserLikedMovies=createAsyncThunk('netflix/getLiked',async(email)=>{
  const {data:{movies}}=await axios.get(`http://localhost:5000/api/user/liked/${email}`)
  return movies;
}
)

export const removeFromLikedMovies = createAsyncThunk(
  'netflix/deleteLiked',
  async ({ movieId, email }) => {
  
    const { data: { movies } } = await axios.put(`http://localhost:5000/api/user/delete`, { movieId, email });
    return movies;
  }
);

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
   
  }

});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
})
