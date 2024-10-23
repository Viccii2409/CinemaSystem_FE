package com.example.cinema.model.movie;

import java.util.*;
import com.example.cinema.model.user.*;

public class Genre {

	private String name;
	private String describe;
	private boolean status;
	List<Movie> movie;
	List<Customer> customer;

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

	public String getDescribe() {
		return this.describe;
	}

	/**
	 * 
	 * @param describe
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
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