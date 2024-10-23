package com.example.cinema.model.payment;

public class PayCash extends Payment {

	private float received;
	private float moneyReturned;

	public float getReceived() {
		return this.received;
	}

	/**
	 * 
	 * @param received
	 */
	public void setReceived(float received) {
		this.received = received;
	}

	public float getMoneyReturned() {
		return this.moneyReturned;
	}

	/**
	 * 
	 * @param moneyReturned
	 */
	public void setMoneyReturned(float moneyReturned) {
		this.moneyReturned = moneyReturned;
	}

}