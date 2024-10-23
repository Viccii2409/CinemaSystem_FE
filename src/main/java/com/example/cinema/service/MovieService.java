package com.example.cinema.service;

import com.example.cinema.model.Image;
import com.example.cinema.model.movie.*;

import java.sql.Date;
import java.util.List;

public interface MovieService {

	/**
	 * 
	 * @param movie
	 */
	boolean addMovie(Movie movie);

	/**
	 * 
	 * @param movie
	 */
	boolean editMovie(Movie movie);

	/**
	 * 
	 * @param movie
	 */
	List<Movie> getCommingSoonMovie(Movie movie);

	/**
	 * 
	 * @param movie
	 */
	List<Movie> getShowingNowMovie(Movie movie);

	/**
	 * 
	 * @param movieID
	 */
	boolean updateStatusMovie(int movieID);

	/**
	 * 
	 * @param movieID
	 */
	Movie getMovieByID(int movieID);

	List<Movie> getAllMovies();

	/**
	 * 
	 * @param genreID
	 */
	List<Movie> getMoviesByGenre(int genreID);

	/**
	 * 
	 * @param languageID
	 */
	List<Movie> getMoviesByLanguage(int languageID);

	/**
	 * 
	 * @param title
	 */
	List<Movie> searchMoviesByTitle(String title);

	/**
	 * 
	 * @param castID
	 */
	List<Movie> getMoviesByCastID(int castID);

	/**
	 * 
	 * @param directorID
	 */
	List<Movie> getMoviesByDirectorID(int directorID);

	/**
	 * 
	 * @param genre
	 */
	boolean addGenre(Genre genre);

	/**
	 * 
	 * @param genre
	 */
	boolean updateGenre(Genre genre);

	/**
	 * 
	 * @param genreID
	 */
	boolean updateStatusGenre(int genreID);

	/**
	 * 
	 * @param genreID
	 */
	Genre getGenreByID(int genreID);

	List<Genre> getAllGenres();

	/**
	 * 
	 * @param movieID
	 * @param genreID
	 */
	boolean deleteGenreMovie(int movieID, int genreID);

	/**
	 * 
	 * @param language
	 */
	boolean addLanguage(Language language);

	/**
	 * 
	 * @param language
	 */
	boolean updateLanguage(Language language);

	/**
	 * 
	 * @param languageID
	 */
	Language getLanguageByID(int languageID);

	List<Language> getAllLanguages();

	/**
	 * 
	 * @param trailer
	 */
	boolean addTrailer(Trailer trailer);

	/**
	 * 
	 * @param trailer
	 */
	boolean updateTrailer(Trailer trailer);

	/**
	 * 
	 * @param trailerID
	 */
	Trailer getTrailerByID(int trailerID);

	/**
	 * 
	 * @param cast
	 */
	boolean addCast(Cast cast);

	/**
	 * 
	 * @param cat
	 */
	boolean deleteCast(Cast cat);

	/**
	 * 
	 * @param cast
	 */
	boolean updateCast(Cast cast);

	/**
	 * 
	 * @param castID
	 */
	Cast getCastByID(int castID);

	List<Cast> getAllCasts();

	/**
	 * 
	 * @param movieID
	 */
	List<Cast> getCastsByMovieID(int movieID);

	/**
	 * 
	 * @param name
	 */
	List<Cast> searchCastByName(String name);

	/**
	 * 
	 * @param director
	 */
	boolean addDirector(Director director);

	/**
	 * 
	 * @param director
	 */
	boolean updateDirector(Director director);

	/**
	 * 
	 * @param directorID
	 */
	Director getDirectorByID(int directorID);

	List<Director> getAllDirectors();

	/**
	 * 
	 * @param movieID
	 */
	Director getDirectorsByMovieID(int movieID);

	/**
	 * 
	 * @param name
	 */
	List<Director> searchDirectorByName(String name);

	/**
	 * 
	 * @param imageID
	 */
	Image getImage(int imageID);

	/**
	 * 
	 * @param image
	 */
	boolean addImage(Image image);

	/**
	 * 
	 * @param image
	 */
	boolean updateImage(Image image);

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 */
	float getMovieStat(Date startDate, Date endDate);

}