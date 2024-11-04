package com.springboot.cinemasystem.model.entity;

import java.sql.Time;
import java.util.*;

public class TimeFrame {

	List<PriceTicket> priceticket;
	private int timeFrameID;
	private String name;
	private Time timeStart;
	private Time timeEnd;

	public int getTimeFrameID() {
		return this.timeFrameID;
	}

	/**
	 * 
	 * @param timeFrameID
	 */
	public void setTimeFrameID(int timeFrameID) {
		this.timeFrameID = timeFrameID;
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

	public Time getTimeStart() {
		return this.timeStart;
	}

	/**
	 * 
	 * @param timeStart
	 */
	public void setTimeStart(Time timeStart) {
		this.timeStart = timeStart;
	}

	public Time getTimeEnd() {
		return this.timeEnd;
	}

	/**
	 * 
	 * @param timeEnd
	 */
	public void setTimeEnd(Time timeEnd) {
		this.timeEnd = timeEnd;
	}

}