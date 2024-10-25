package com.example.cinema.model.movie;

import com.example.cinema.model.ticketbought.*;

import java.sql.Date;

public class Feedback {

	private String text;
	private Date date;
	Movie movie;
	TicketBought ticketBought;
	Rating rating;

	public String getText() {
		return this.text;
	}

	/**
	 * 
	 * @param text
	 */
	public void setText(String text) {
		this.text = text;
	}

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

}