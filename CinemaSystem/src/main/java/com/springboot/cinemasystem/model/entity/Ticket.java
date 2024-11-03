package com.springboot.cinemasystem.model.entity;

import java.time.LocalDateTime;
import java.util.*;

public class Ticket {

	Feedback feedback;
	User user;
	Schedule schedule;
	List<Seat> seat;
	PriceTicket priceticket;
	Payment payment;
	private int ticketID;
	private LocalDateTime date;
	private String barcode;
	private int quantitySeat;

	public int getTicketID() {
		return this.ticketID;
	}

	/**
	 * 
	 * @param ticketID
	 */
	public void setTicketID(int ticketID) {
		this.ticketID = ticketID;
	}

	public LocalDateTime getDate() {
		return this.date;
	}

	/**
	 * 
	 * @param date
	 */
	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getBarcode() {
		return this.barcode;
	}

	/**
	 * 
	 * @param barcode
	 */
	public void setBarcode(String barcode) {
		this.barcode = barcode;
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