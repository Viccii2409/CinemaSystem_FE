package com.example.cinema.model.payment;

import java.util.*;

public class Discount {

	private String name;
	private float reducedValue;
	private String discountCode;
	private String image;
	private String describe;
	private boolean status;
	List<Payment> payment;
	TypeDiscount typeDiscount;

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

	public float getReducedValue() {
		return this.reducedValue;
	}

	/**
	 * 
	 * @param reducedValue
	 */
	public void setReducedValue(float reducedValue) {
		this.reducedValue = reducedValue;
	}

	public String getDiscountCode() {
		return this.discountCode;
	}

	/**
	 * 
	 * @param discountCode
	 */
	public void setDiscountCode(String discountCode) {
		this.discountCode = discountCode;
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