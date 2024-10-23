package com.example.cinema.model.user;

public class Name {

	private String firstName;
	private String midName;
	private String lastName;
	private String fullname;
	User user;

	public String getFirstName() {
		return this.firstName;
	}

	/**
	 * 
	 * @param firstName
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMidName() {
		return this.midName;
	}

	/**
	 * 
	 * @param midName
	 */
	public void setMidName(String midName) {
		this.midName = midName;
	}

	public String getLastName() {
		return this.lastName;
	}

	/**
	 * 
	 * @param lastName
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFullname() {
		return this.fullname;
	}

	/**
	 * 
	 * @param fullname
	 */
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

}