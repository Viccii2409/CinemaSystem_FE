package com.example.cinema.model.theater;

import java.util.*;
import com.example.cinema.model.user.*;

public class Theater {

	private String name;
	private String describe;
	private String phone;
	private String email;
	private String image;
	private int quantityRoom;
	private boolean status;
	List<Agent> agent;
	List<Room> room;
	Address address;

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

	public String getPhone() {
		return this.phone;
	}

	/**
	 * 
	 * @param phone
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return this.email;
	}

	/**
	 * 
	 * @param email
	 */
	public void setEmail(String email) {
		this.email = email;
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

	public int getQuantityRoom() {
		return this.quantityRoom;
	}

	/**
	 * 
	 * @param quantityRoom
	 */
	public void setQuantityRoom(int quantityRoom) {
		this.quantityRoom = quantityRoom;
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

	/**
	 * 
	 * @param theaterID
	 */
	public List<Theater> getTheater(int theaterID) {
		// TODO - implement Theater.getTheater
		throw new UnsupportedOperationException();
	}

}