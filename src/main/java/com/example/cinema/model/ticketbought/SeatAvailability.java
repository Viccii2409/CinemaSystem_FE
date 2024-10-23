package com.example.cinema.model.ticketbought;

import com.example.cinema.model.movie.*;
import com.example.cinema.model.theater.*;

public class SeatAvailability {

	private boolean isAvailable;
	Showtime showtime;
	Seat seat;

	public boolean getIsAvailable() {
		return this.isAvailable;
	}

	/**
	 * 
	 * @param isAvailable
	 */
	public void setIsAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

}