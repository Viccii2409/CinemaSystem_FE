package com.example.cinema.model.ticketbought;

import java.util.*;

public class DayOfWeek {

	private String name;
	private int dayStart;
	private int dayEnd;
	private float surcharge;
	List<SeatTicket> seatTicket;

	public String getName() {
		return this.name;
	}

	/**
	 * 
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	public int getDayStart() {
		return this.dayStart;
	}

	/**
	 * 
	 * @param dayStart
	 */
	public void setDayStart(int dayStart) {
		this.dayStart = dayStart;
	}

	public int getDayEnd() {
		return this.dayEnd;
	}

	/**
	 * 
	 * @param dayEnd
	 */
	public void setDayEnd(int dayEnd) {
		this.dayEnd = dayEnd;
	}

	public float getSurcharge() {
		return this.surcharge;
	}

	/**
	 * 
	 * @param surcharge
	 */
	public void setSurcharge(float surcharge) {
		this.surcharge = surcharge;
	}

}