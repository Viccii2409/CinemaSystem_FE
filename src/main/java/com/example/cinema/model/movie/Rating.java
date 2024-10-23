package com.example.cinema.model.movie;

import java.util.*;

public class Rating {

	private int star;
	private String describe;
	List<Feedback> feedback;

	public int getStar() {
		return this.star;
	}

	/**
	 * 
	 * @param star
	 */
	public void setStar(int star) {
		this.star = star;
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

}