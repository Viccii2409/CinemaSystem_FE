package com.example.cinema.model.theater;

import java.util.Date;

public class TheaterStat extends Theater {

	private Date dateStart;
	private Date dateEnd;
	private float revenue;

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