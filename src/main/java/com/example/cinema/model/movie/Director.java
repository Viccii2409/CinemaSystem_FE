package com.example.cinema.model.movie;

import java.util.*;

public class Director {

	private String name;
	List<Movie> movie;

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