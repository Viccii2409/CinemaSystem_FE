package com.example.cinema.service;

import com.example.cinema.model.ticketbought.*;

import java.util.List;

public interface TicketBoughtService {

	/**
	 * 
	 * @param ticketBoughtID
	 */
	TicketBought getTicketBoughtByID(int ticketBoughtID);

	/**
	 * 
	 * @param ticketBought
	 */
	boolean addTicketBought(TicketBought ticketBought);

	/**
	 * 
	 * @param customerID
	 */
	List<TicketBought> getTicketBoughtByCustomer(int customerID);

}