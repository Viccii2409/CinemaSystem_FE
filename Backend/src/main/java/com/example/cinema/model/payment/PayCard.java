package com.example.cinema.model.payment;

public class PayCard extends Payment {

	private String bank;
	private String name;
	private String accountNumber;

	public String getBank() {
		return this.bank;
	}

	/**
	 * 
	 * @param bank
	 */
	public void setBank(String bank) {
		this.bank = bank;
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

	public String getAccountNumber() {
		return this.accountNumber;
	}

	/**
	 * 
	 * @param accountNumber
	 */
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

}