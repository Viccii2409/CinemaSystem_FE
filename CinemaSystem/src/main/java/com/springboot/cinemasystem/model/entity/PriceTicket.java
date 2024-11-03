package com.springboot.cinemasystem.model.entity;

import java.util.*;


public class PriceTicket {

	List<Ticket> ticket;
	TypeUser typeuser;
	TimeFrame timeframe;
	DayOfWeek dayofweek;
	TypeRoom typeroom;
	private int priceTicketID;
	private int price;

	public int getPriceTicketID() {
		return this.priceTicketID;
	}

	/**
	 * 
	 * @param priceTicketID
	 */
	public void setPriceTicketID(int priceTicketID) {
		this.priceTicketID = priceTicketID;
	}

	public int getPrice() {
		return this.price;
	}

	/**
	 * 
	 * @param price
	 */
	public void setPrice(int price) {
		this.price = price;
	}

}