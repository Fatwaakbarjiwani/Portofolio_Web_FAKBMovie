import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovie: [],
  topRatedMovie: [],
  upcomingMovie: [],
  videoMovie: [],
  genreMovie: [],
  detailMovie: [],
  actorMovie: [],
  searchMovie: [],
  isOpen: false,
  totalPages: 0,
  idMovie: 0,
};
const authSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopularMovie: (state, action) => {
      state.popularMovie = action.payload;
    },
    setTopRatedMovie: (state, action) => {
      state.topRatedMovie = action.payload;
    },
    setUpcomingMovie: (state, action) => {
      state.upcomingMovie = action.payload;
    },
    setVideoMovie: (state, action) => {
      state.videoMovie = action.payload;
    },
    setGenreMovie: (state, action) => {
      state.genreMovie = action.payload;
    },
    setDetailMovie: (state, action) => {
      state.detailMovie = action.payload;
    },
    setActorMovie: (state, action) => {
      state.actorMovie = action.payload;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setSearchMovie: (state, action) => {
      state.searchMovie = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setIdMovie: (state, action) => {
      state.idMovie = action.payload;
    },
  },
});

export const {
  setPopularMovie,
  setTopRatedMovie,
  setSearchMovie,
  setUpcomingMovie,
  setVideoMovie,
  setGenreMovie,
  setDetailMovie,
  setActorMovie,
  setOpen,
  setTotalPages,
  setIdMovie,
} = authSlice.actions;

export default authSlice.reducer;
