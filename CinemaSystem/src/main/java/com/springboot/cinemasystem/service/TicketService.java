package com.springboot.cinemasystem.service;

import java.util.List;

import com.springboot.cinemasystem.model.entity.PayCard;
import com.springboot.cinemasystem.model.entity.PayCash;
import com.springboot.cinemasystem.model.entity.Payment;
import com.springboot.cinemasystem.model.entity.Ticket;

public interface TicketService {

	/**
	 * 
	 * @param ticketID
	 */
	Ticket getTicket(int ticketID);

	/**
	 * 
	 * @param ticket
	 */
	boolean addTicket(Ticket ticket);

	/**
	 * 
	 * @param userID
	 */
	List<Ticket> getUser(int userID);

	/**
	 * 
	 * @param paymentID
	 */
	Payment getPayment(int paymentID);

	/**
	 * 
	 * @param payCash
	 */
	boolean addPayCash(PayCash payCash);

	/**
	 * 
	 * @param payCash
	 */
	boolean updatePayCash(PayCash payCash);

	/**
	 * 
	 * @param payCard
	 */
	boolean addPayCard(PayCard payCard);

	/**
	 * 
	 * @param payCard
	 */
	boolean updatePayCard(PayCard payCard);

	/**
	 * 
	 * @param barcode
	 */
	Ticket getTicket(String barcode);

	/**
	 * 
	 * @param userID
	 */
	int getPriceTicket(int userID);

	/**
	 * 
	 * @param typeUserID
	 */
	int getPriceTicker(int typeUserID);

}