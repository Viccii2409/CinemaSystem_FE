package com.example.cinema.model.movie;

import java.sql.Time;
import java.util.*;
import com.example.cinema.model.ticketbought.*;
import com.example.cinema.model.theater.*;

public class Showtime {

	private Date date;
	private Time startTime;
	private Time endTime;
	private boolean status;
	private int availableSeats;
	List<TicketBought> ticketBought;
	Movie movie;
	Room room;
	List<SeatAvailability> seatAvailability;

	public Date getDate() {
		return this.date;
	}

	/**
	 * 
	 * @param date
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	public Time getStartTime() {
		return this.startTime;
	}

	/**
	 * 
	 * @param startTime
	 */
	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Time getEndTime() {
		return this.endTime;
	}

	/**
	 * 
	 * @param endTime
	 */
	public void setEndTime(Time endTime) {
		this.endTime = endTime;
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

	public int getAvailableSeats() {
		return this.availableSeats;
	}

	/**
	 * 
	 * @param availableSeats
	 */
	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}

}