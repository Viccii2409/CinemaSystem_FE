package com.springboot.cinemasystem.model.entity;

public class PayCash extends Payment {

	private int received;
	private int moneyReturned;

	public int getReceived() {
		return this.received;
	}

	/**
	 * 
	 * @param received
	 */
	public void setReceived(int received) {
		this.received = received;
	}

	public int getMoneyReturned() {
		return this.moneyReturned;
	}

	/**
	 * 
	 * @param moneyReturned
	 */
	public void setMoneyReturned(int moneyReturned) {
		this.moneyReturned = moneyReturned;
	}

}