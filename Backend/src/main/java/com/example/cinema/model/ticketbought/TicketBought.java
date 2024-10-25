package com.example.cinema.model.ticketbought;

import com.example.cinema.model.payment.*;
import com.example.cinema.model.movie.*;
import com.example.cinema.model.user.*;

import java.util.Date;

public class TicketBought {

	private Date date;
	private int quantitySeat;
	Payment payment;
	Feedback feedback;
	Customer customer;
	Showtime showtime;
	SeatTicket seatTicket;

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

	public int getQuantitySeat() {
		return this.quantitySeat;
	}

	/**
	 * 
	 * @param quantitySeat
	 */
	public void setQuantitySeat(int quantitySeat) {
		this.quantitySeat = quantitySeat;
	}

}