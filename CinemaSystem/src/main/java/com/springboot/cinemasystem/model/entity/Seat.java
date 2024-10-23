package com.springboot.cinemasystem.model.entity;

public class Seat {

	Ticket ticket;
	Room room;
	TypeSeat typeseat;
	private int seatID;
	private int seatNumber;
	private String rowNumber;
	private boolean status;
	private String name;

	public int getSeatID() {
		return this.seatID;
	}

	/**
	 * 
	 * @param seatID
	 */
	public void setSeatID(int seatID) {
		this.seatID = seatID;
	}

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

	public String getRowNumber() {
		return this.rowNumber;
	}

	/**
	 * 
	 * @param rowNumber
	 */
	public void setRowNumber(String rowNumber) {
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