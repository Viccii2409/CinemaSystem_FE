package com.example.cinema.model.payment;

import java.util.*;

public class TypeDiscount {

	private String name;
	List<Discount> discount;

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