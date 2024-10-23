package com.example.cinema.model.theater;

import java.util.*;
import com.example.cinema.model.movie.*;

public class Room {

	private String name;
	private int quantitySeat;
	private boolean status;
	List<Showtime> showtime;
	Theater theater;
	TypeRoom typeRoom;
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

	public boolean getStatus() {
		return this.status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(boolean status) {
		this.status = status;
	}

}