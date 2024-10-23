package com.example.cinema.model.ticketbought;

import java.util.*;

public class TypeUser {

	private String name;
	private int ageStart;
	private int ageEnd;
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

	public int getAgeStart() {
		return this.ageStart;
	}

	/**
	 * 
	 * @param ageStart
	 */
	public void setAgeStart(int ageStart) {
		this.ageStart = ageStart;
	}

	public int getAgeEnd() {
		return this.ageEnd;
	}

	/**
	 * 
	 * @param ageEnd
	 */
	public void setAgeEnd(int ageEnd) {
		this.ageEnd = ageEnd;
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