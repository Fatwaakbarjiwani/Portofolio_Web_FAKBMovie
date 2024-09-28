import axios from "axios";
import {
  setActorMovie,
  setDetailMovie,
  setGenreMovie,
  setPopularMovie,
  setSearchMovie,
  setTopRatedMovie,
  setTotalPages,
  setUpcomingMovie,
  setVideoMovie,
} from "../reducers/movieReducer";

export const API_URL = import.meta.env.VITE_API_URL;
export const token = import.meta.env.VITE_API_TOKEN;

export const getPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setPopularMovie(data.results));
  } catch (error) {
    return;
  }
};
export const getTopRatedMovies = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/trending/movie/day?page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setTopRatedMovie(data.results));
    dispatch(setTotalPages(data.total_pages));
  } catch (error) {
    return;
  }
};
export const getUpcomingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setUpcomingMovie(data.results));
  } catch (error) {
    return;
  }
};
export const getVideoMovies = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setVideoMovie(data.results));
  } catch (error) {
    return;
  }
};
export const getGenreMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setGenreMovie(data.genres));
  } catch (error) {
    return;
  }
};
export const getActorMovies = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setActorMovie(data.cast));
  } catch (error) {
    return;
  }
};
export const getDetailMovies = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setDetailMovie(data));
  } catch (error) {
    return;
  }
};
export const getSearchMovies = (search) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/search/movie?query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    dispatch(setSearchMovie(data.results));
  } catch (error) {
    return;
  }
};
