package com.example.cinema.model.user;

public class Manager extends Employee {

	private int managedEmployees;

	public int getManagedEmployees() {
		return this.managedEmployees;
	}

	/**
	 * 
	 * @param managedEmployees
	 */
	public void setManagedEmployees(int managedEmployees) {
		this.managedEmployees = managedEmployees;
	}

}