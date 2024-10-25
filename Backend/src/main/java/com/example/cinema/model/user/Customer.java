package com.example.cinema.model.user;

import java.util.*;
import com.example.cinema.model.payment.*;
import com.example.cinema.model.movie.*;
import com.example.cinema.model.ticketbought.*;

public class Customer extends User {

	private int points;
	List<Discount> discount;
	List<Genre> genre;
	Level level;
	List<TicketBought> ticketBought;
	List<SeatReservation> seatReservation;

	public int getPoints() {
		return this.points;
	}

	/**
	 * 
	 * @param points
	 */
	public void setPoints(int points) {
		this.points = points;
	}

}