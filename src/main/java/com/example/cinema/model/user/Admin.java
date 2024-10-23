package com.example.cinema.model.user;

public class Admin extends Employee {

	private String privileges;
	private String lastLogin;

	public String getPrivileges() {
		return this.privileges;
	}

	/**
	 * 
	 * @param privileges
	 */
	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}

	public String getLastLogin() {
		return this.lastLogin;
	}

	/**
	 * 
	 * @param lastLogin
	 */
	public void setLastLogin(String lastLogin) {
		this.lastLogin = lastLogin;
	}

}