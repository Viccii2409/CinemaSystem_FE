package com.example.cinema.model.ticketbought;

import java.sql.Time;
import java.util.*;

public class TimeFrame {

	private String name;
	private Time timeStart;
	private Time timeEnd;
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

	public Time getTimeStart() {
		return this.timeStart;
	}

	/**
	 * 
	 * @param timeStart
	 */
	public void setTimeStart(Time timeStart) {
		this.timeStart = timeStart;
	}

	public Time getTimeEnd() {
		return this.timeEnd;
	}

	/**
	 * 
	 * @param timeEnd
	 */
	public void setTimeEnd(Time timeEnd) {
		this.timeEnd = timeEnd;
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