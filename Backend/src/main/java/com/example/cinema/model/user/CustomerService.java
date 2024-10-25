package com.example.cinema.model.user;

public class CustomerService extends Employee {

	private String assignedTasks;

	public String getAssignedTasks() {
		return this.assignedTasks;
	}

	/**
	 * 
	 * @param assignedTasks
	 */
	public void setAssignedTasks(String assignedTasks) {
		this.assignedTasks = assignedTasks;
	}

}