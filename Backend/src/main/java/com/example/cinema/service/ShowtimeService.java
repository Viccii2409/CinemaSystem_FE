package com.example.cinema.service;

import com.example.cinema.model.movie.*;

import java.util.List;

public interface ShowtimeService {

	/**
	 * 
	 * @param showtime
	 */
	boolean addShowtime(Showtime showtime);

	/**
	 * 
	 * @param shotime
	 */
	boolean updateShowtime(Showtime shotime);

	/**
	 * 
	 * @param movieID
	 */
	List<Showtime> getShowtimeByMovie(int movieID);

	/**
	 * 
	 * @param showtimeID
	 */
	boolean updateStatusShowtime(int showtimeID);

	/**
	 * 
	 * @param showtimeID
	 */
	Showtime getShowtimeByID(int showtimeID);

	/**
	 * 
	 * @param roomID
	 */
	List<Showtime> getShowtimesByRoomID(int roomID);

	/**
	 * 
	 * @param showtimeID
	 */
	boolean checkAvailability(int showtimeID);

}