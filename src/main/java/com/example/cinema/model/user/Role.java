package com.example.cinema.model.user;

import java.util.*;

public class Role {

	private String name;
	List<Position> position;

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

}