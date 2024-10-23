package com.example.cinema.model.ticketbought;

import com.example.cinema.model.user.*;
import com.example.cinema.model.theater.*;

import java.util.Date;

public class SeatReservation {

	private String reservationTime;
	private String expiryTime;
	Customer customer;
	Seat seat;

	public String getReservationTime() {
		return this.reservationTime;
	}

	/**
	 * 
	 * @param reservationTime
	 */
	public void setReservationTime(String reservationTime) {
		this.reservationTime = reservationTime;
	}

	public String getExpiryTime() {
		return this.expiryTime;
	}

	/**
	 * 
	 * @param expiryTime
	 */
	public void setExpiryTime(String expiryTime) {
		this.expiryTime = expiryTime;
	}

}