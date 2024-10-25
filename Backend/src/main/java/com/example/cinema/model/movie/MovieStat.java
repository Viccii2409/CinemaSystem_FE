package com.example.cinema.model.movie;

import java.util.Date;

public class MovieStat extends Movie {

	private Date dateStart;
	private Date dateEnd;
	private float renvenue;

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

	public float getRenvenue() {
		return this.renvenue;
	}

	/**
	 * 
	 * @param renvenue
	 */
	public void setRenvenue(float renvenue) {
		this.renvenue = renvenue;
	}

}