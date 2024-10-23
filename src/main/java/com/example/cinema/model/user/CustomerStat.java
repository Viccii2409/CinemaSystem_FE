package com.example.cinema.model.user;

import java.sql.Date;

public class CustomerStat extends Customer {

	private Date dateStart;
	private Date dateEnd;
	private float revence;

	public Date getDateStart() {
		return this.dateStart;
	}

	/**
	 * 
	 * @param dateStart
	 */
	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}

	public Date getDateEnd() {
		return this.dateEnd;
	}

	/**
	 * 
	 * @param dateEnd
	 */
	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public float getRevence() {
		return this.revence;
	}

	/**
	 * 
	 * @param revence
	 */
	public void setRevence(float revence) {
		this.revence = revence;
	}

}