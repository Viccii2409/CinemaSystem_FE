package com.example.cinema.model.ticketbought;

import com.example.cinema.model.theater.*;

public class SeatTicket {

	private float price;
	private float surcharge;
	private float finalPrice;
	TicketBought ticketBought;
	DayOfWeek dayOfWeek;
	TimeFrame timeFrame;
	TypeUser typeUser;
	Seat seat;
	float basePrice;

	public float getBasePrice() {
		return this.basePrice;
	}

	/**
	 * 
	 * @param basePrice
	 */
	public void setBasePrice(float basePrice) {
		this.basePrice = basePrice;
	}

	public float getSurchange() {
		// TODO - implement SeatTicket.getSurchange
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param surchange
	 */
	public void setSurchange(float surchange) {
		// TODO - implement SeatTicket.setSurchange
		throw new UnsupportedOperationException();
	}

	public float getFinalPrice() {
		return this.finalPrice;
	}

	/**
	 * 
	 * @param finalPrice
	 */
	public void setFinalPrice(float finalPrice) {
		this.finalPrice = finalPrice;
	}

}