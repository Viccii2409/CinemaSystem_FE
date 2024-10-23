package com.example.cinema.model.theater;

import java.util.*;
import com.example.cinema.model.ticketbought.*;

public class Seat {

	private String name;
	private int seatNumber;
	private char rowNumber;
	private boolean status;
	Room room;
	List<SeatTicket> seatTicket;
	List<SeatAvailability> seatAvailability;
	List<SeatReservation> seatReservation;
	TypeSeat typeSeat;

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

	public int getSeatNumber() {
		return this.seatNumber;
	}

	/**
	 * 
	 * @param seatNumber
	 */
	public void setSeatNumber(int seatNumber) {
		this.seatNumber = seatNumber;
	}

	public char getRowNumber() {
		return this.rowNumber;
	}

	/**
	 * 
	 * @param rowNumber
	 */
	public void setRowNumber(char rowNumber) {
		this.rowNumber = rowNumber;
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