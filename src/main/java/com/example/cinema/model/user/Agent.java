package com.example.cinema.model.user;

import com.example.cinema.model.theater.*;
import com.example.cinema.model.payment.*;

public class Agent extends Employee {

	private Theater workStation;
	private int ticketsSold;
	Theater theater;
	Payment payment;

	public Theater getWorkStation() {
		return this.workStation;
	}

	/**
	 * 
	 * @param workStation
	 */
	public void setWorkStation(Theater workStation) {
		this.workStation = workStation;
	}

	public int getTicketsSold() {
		return this.ticketsSold;
	}

	/**
	 * 
	 * @param ticketsSold
	 */
	public void setTicketsSold(int ticketsSold) {
		this.ticketsSold = ticketsSold;
	}

}