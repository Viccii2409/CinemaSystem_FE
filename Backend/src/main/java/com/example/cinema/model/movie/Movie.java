package com.example.cinema.model.movie;

import com.example.cinema.model.Image;

import java.util.*;

public class Movie {

	private String title;
	private int duration;
	private Date releaseDate;
	private String describe;
	private boolean status;
	private float rating;
	List<Showtime> showtime;
	List<Feedback> feedback;
	Director director;
	Language language;
	Trailer trailer;
	List<Image> image;
	List<Cast> cast;
	List<Genre> genre;

	public String getTitle() {
		return this.title;
	}

	/**
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	public int getDuration() {
		return this.duration;
	}

	/**
	 * 
	 * @param duration
	 */
	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Date getReleaseDate() {
		return this.releaseDate;
	}

	/**
	 * 
	 * @param releaseDate
	 */
	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getDescribe() {
		return this.describe;
	}

	/**
	 * 
	 * @param describe
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public boolean getStatus() {
		return this.status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(boolean status) {
		this.status = status;
	}

	public float getRating() {
		return this.rating;
	}

	/**
	 * 
	 * @param rating
	 */
	public void setRating(float rating) {
		this.rating = rating;
	}

	/**
	 * 
	 * @param movieID
	 */
	public Movie getMovie(int movieID) {
		// TODO - implement Movie.getMovie
		throw new UnsupportedOperationException();
	}

}