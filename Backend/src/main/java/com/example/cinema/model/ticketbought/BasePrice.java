package com.example.cinema.model.ticketbought;

import java.util.*;

public class BasePrice {

	private float defaultPrice;
	private String createdAt;
	private String updatedAt;
	List<SeatTicket> seatTicket;

	public float getDefaultPrice() {
		return this.defaultPrice;
	}

	/**
	 * 
	 * @param defaultPrice
	 */
	public void setDefaultPrice(float defaultPrice) {
		this.defaultPrice = defaultPrice;
	}

	public String getCreatedAt() {
		return this.createdAt;
	}

	/**
	 * 
	 * @param createdAt
	 */
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
		return this.updatedAt;
	}

	/**
	 * 
	 * @param updatedAt
	 */
	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

}