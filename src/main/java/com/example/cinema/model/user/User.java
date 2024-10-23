package com.example.cinema.model.user;

import java.util.*;

public class User {

	private boolean gender;
	private Date dob;
	private String address;
	private String email;
	private String phone;
	private String image;
	private Date startDate;
	Account account;
	Name name;
	List<Notification> notification;

	public boolean getGender() {
		return this.gender;
	}

	/**
	 * 
	 * @param gender
	 */
	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return this.dob;
	}

	/**
	 * 
	 * @param dob
	 */
	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getAddress() {
		return this.address;
	}

	/**
	 * 
	 * @param address
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return this.email;
	}

	/**
	 * 
	 * @param email
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return this.phone;
	}

	/**
	 * 
	 * @param phone
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getImage() {
		return this.image;
	}

	/**
	 * 
	 * @param image
	 */
	public void setImage(String image) {
		this.image = image;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	/**
	 * 
	 * @param startDate
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

}