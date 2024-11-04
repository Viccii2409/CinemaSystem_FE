package com.springboot.cinemasystem.model.entity;

import java.sql.Time;
import java.util.*;



public class Schedule {

	List<Ticket> ticket;
	Movie movie;
	Room room;
	private int scheduleID;
	private Date date;
	private Time startTime;
	private Time endTime;
	private boolean status;

	public int getScheduleID() {
		return this.scheduleID;
	}

	/**
	 * 
	 * @param scheduleID
	 */
	public void setScheduleID(int scheduleID) {
		this.scheduleID = scheduleID;
	}

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

	public Time getStartTime() {
		return this.startTime;
	}

	/**
	 * 
	 * @param startTime
	 */
	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Time getEndTime() {
		return this.endTime;
	}

	/**
	 * 
	 * @param endTime
	 */
	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}

	public boolean getStatus() {
		return this.status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(boolean status) {
		this.status = status;
	}

}