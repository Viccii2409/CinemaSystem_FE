import React, { useState, useContext, useEffect } from "react";
import "./GenreFavourite.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { getAllGenreCustomer } from "../config/MovieConfig";
import { addGenreFauvorite } from "../config/UserConfig";

const GenreFavourite = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (user == null) {
            navigate('/login-page');
            return;
        }
        const fetchGenre = async () => {
            const response_genre = await getAllGenreCustomer();
            // console.log(response_genre);
            setGenres(response_genre);
        }
        fetchGenre();
    }, [])

    const handleCheckboxChange = (e) => {
        const genreId = e.target.value;
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, parseInt(genreId)]);
        } else {
            setSelectedGenres(selectedGenres.filter(id => id !== parseInt(genreId)));
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const genreData = {
            customerid: user.id,
            genres: selectedGenres
        }
        console.log(JSON.stringify(genreData));
        await addGenreFauvorite(genreData);
        navigate('/user-infor');
    }

    return (
        <div className="genre-page">
            <div className="genre-form-container">
                <h2>Thể loại yêu thích của bạn</h2>
                <form onSubmit={handleAddSubmit}>
                    <div className="checkbox-group">
                        {genres.map((genre) => (
                            <label key={genre.id} className="checkbox-button">
                                <input
                                    type="checkbox"
                                    name="genreid"
                                    value={genre.id}
                                    checked={selectedGenres.includes(genre.id)}
                                    onChange={handleCheckboxChange}
                                />
                                <span>{genre.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="button-container">
                        <button type="button"
                            onClick={() => navigate('/home')}
                            className="exit-btn">Thoát</button>
                        <button type="submit" className="submit-btn">Hoàn thành</button>
                    </div>
                </form>
            </div>
        </div>



    )
}
export default GenreFavourite;