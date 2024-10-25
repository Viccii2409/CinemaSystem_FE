package com.example.cinema.model.user;

public class Employee extends User {

	private boolean status;
	Position position;

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