package com.springboot.cinemasystem.model.entity;


public class Discount {

	Payment payment;
	User user;
	TypeDiscount typediscount;
	private int discountID;
	private String name;
	private int reducedValue;
	private String discountCode;
	private String image;
	private String describe;
	private boolean status;

	public int getDiscountID() {
		return this.discountID;
	}

	/**
	 * 
	 * @param discountID
	 */
	public void setDiscountID(int discountID) {
		this.discountID = discountID;
	}

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

	public int getReducedValue() {
		return this.reducedValue;
	}

	/**
	 * 
	 * @param reducedValue
	 */
	public void setReducedValue(int reducedValue) {
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