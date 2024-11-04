import axios from 'axios';


const API_URL = 'http://localhost:8080/api/movie/genre';


class GenreService {
    getAllGenres() {
        return axios.get(API_URL);
    }


    searchGenres(name) {
        return axios.get(`${API_URL}/search?name=${name}`);
    }


    addGenre(genre) {
        return axios.post(`${API_URL}/add`, genre);
    }


    updateGenre(id, genreDetails) {
        return axios.put(`${API_URL}/${id}`, genreDetails);
    }


    hideGenre(id) {
        return axios.put(`${API_URL}/${id}/hide`);
    }
}

export default new GenreService();
