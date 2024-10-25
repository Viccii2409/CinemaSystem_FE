package com.example.cinema.model.payment;

import java.util.*;

public class RevenueStat {

	private Date date;
	private int month;
	private int quarter;
	private int year;
	private float revenue;
	List<Payment> payment;

	public Date getDate() {
		return this.date;
	}

	/**
	 * 
	 * @param date
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	public int getMonth() {
		return this.month;
	}

	/**
	 * 
	 * @param month
	 */
	public void setMonth(int month) {
		this.month = month;
	}

	public int getQuarter() {
		return this.quarter;
	}

	/**
	 * 
	 * @param quarter
	 */
	public void setQuarter(int quarter) {
		this.quarter = quarter;
	}

	public int getYear() {
		return this.year;
	}

	/**
	 * 
	 * @param year
	 */
	public void setYear(int year) {
		this.year = year;
	}

	public float getRevenue() {
		return this.revenue;
	}

	/**
	 * 
	 * @param revenue
	 */
	public void setRevenue(float revenue) {
		this.revenue = revenue;
	}

}