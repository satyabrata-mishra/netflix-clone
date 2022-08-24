import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TMDB_BASE_URL, api_key } from '../utils/constanst'

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=bf9f018b11ceb751c507a6351098fb02", {
            method: 'GET',
            mode: 'cors',
        });
        const json = await response.json();
        const { genres } = json;
        return genres;
    } catch (error) {
        console.log(error.message);
    }
});





export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const { netflix: { genres }, } = thunkApi.getState();
    return  await getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${api_key}`,genres,true);
});


const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const response = await fetch(`${api}${paging ? `&page=${i}` : ""}`, {
            method: 'GET',
            mode: 'cors',
        });
        const json = await response.json();
        const { results } = json;
        createArrayFromRawData(results, moviesArray, genres);
        return moviesArray;
    }
};

const createArrayFromRawData = (array, moviesArray, genres) => {
    // console.log(array);
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
    });
};

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});