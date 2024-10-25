package com.example.cinema.model.theater;

import java.util.*;

public class TypeSeat {

	private String name;
	private float surcharge;
	List<Seat> seat;

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