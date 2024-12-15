import api from "../Api.js";

export const getMovieNow = () => api.get("/movie/public/showingNow");
export const getMovieSoon = () => api.get("/movie/public/comingSoon");
export const getSlideshow = () => api.get("/movie/public/slideshow");

export const getMovieById = (id) => {
  return api
    .get(`/movie/public/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error get movie by id", error);
      return null;
    });
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/moviedetails/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error get movie by id", error);
      return null;
    })
};

export const getAllGenres = () => {
  return api
    .get(`/movie/public/genre`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllGenres", error);
      return null;
    });
};

export const searchGenres = (name) => {
  return api
    .get(`/movie/genre/search?name=${name}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllGenres", error);
      return null;
    });
};

export const addGenre = (genre) => {
  return api
    .post("/movie/genre/add", genre)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error addGenre", error);
      return null;
    });
};

export const updateGenre = (id, genreDetails) => {
  return api
    .put(`/movie/genre/${id}`, genreDetails)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updateGenre", error);
      return null;
    });
};

export const hideGenre = (id) => {
  return api
    .put(`/movie/genre/${id}/hide`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error hideGenre", error);
      return null;
    });
};

export const deleteGenre = (id) => {
  return api
    .delete(`/movie/genre/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleteGenre", error);
      return null;
    });
};

export const getAllMovies = () => {
  return api
    .get("/movie/all")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllMovies", error);
      return null;
    });
};

export const searchMovies = (title) => {
  return api
    .get("/movie/search", { params: { title } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searchMovies", error);
      return null;
    });
};

export const searchMoviesByGenre = (genreName) => {
  return api
    .get("/movie/searchByGenre", { params: { genreName } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searchMoviesByGenre", error);
      return null;
    });
};

export const addMovie = async (movie) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/movie/add", movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editMovie = async (movie) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/movie/update", movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusMovie = (id) => {
  return api
    .put(`/movie/update-status/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updateStatusMovie", error);
      return null;
    });
};

export const deleteMovie = (id) => {
  return api
    .delete(`/movie/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleteMovie", error);
      return null;
    });
};
export const getFeedback = (movieId) => {
  return api
    .get(`/movie/public/feedback/${movieId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllFeedback", error);
      return null;
    });
};

export const getAllGenreCustomer = () => {
  return api.get('/movie/public/genre')
    .then(response => response.data)
    .catch(error => {
      console.error("Error getAllGenreCustomer", error);
      return null;
    })
};



export const getAllLanguage = () => {
  return api.get('/movie/getAllLanguage')
    .then(response => response.data)
    .catch(error => {
      console.error("Error getAllLanguage", error);
      return null;
    })
};

// export const getMovieById = (id) => {
//   return
// }

