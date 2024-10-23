package com.example.cinema.model.payment;

import com.example.cinema.model.user.*;
import java.util.*;
import com.example.cinema.model.ticketbought.*;

public class Payment {

	private String payMethod;
	private float amount;
	private String barcode;
	private int agentID;
	Agent agent;
	Discount discount;
	List<TicketBought> ticketBought;
	RevenueStat revenueStat;
	TypePay typePay;

	public String getPayMethod() {
		return this.payMethod;
	}

	/**
	 * 
	 * @param payMethod
	 */
	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}

	public float getAmount() {
		return this.amount;
	}

	/**
	 * 
	 * @param amount
	 */
	public void setAmount(float amount) {
		this.amount = amount;
	}

	public String getBarcode() {
		return this.barcode;
	}

	/**
	 * 
	 * @param barcode
	 */
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	/**
	 * 
	 * @param paymentID
	 */
	public Payment getPayment(int paymentID) {
		// TODO - implement Payment.getPayment
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param paymentID
	 */
	public int getAgentID(int paymentID) {
		return this.agentID;
	}

}