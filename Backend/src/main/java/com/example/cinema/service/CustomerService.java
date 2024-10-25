package com.example.cinema.service;

import com.example.cinema.model.user.*;

import java.sql.Date;
import java.util.List;

public interface CustomerService {

	/**
	 * 
	 * @param customer
	 */
	boolean addCustomer(Customer customer);

	/**
	 * 
	 * @param customer
	 */
	boolean updateCustomer(Customer customer);

	/**
	 * 
	 * @param customerID
	 */
	Customer getCustomerID(int customerID);

	List<Customer> getAllCustomers();

	/**
	 * 
	 * @param customerID
	 * @param points
	 */
	boolean earnPoints(int customerID, int points);

	/**
	 * 
	 * @param customerID
	 * @param points
	 */
	boolean redeemPoints(int customerID, int points);

	/**
	 * 
	 * @param level
	 */
	boolean addLevel(Level level);

	/**
	 * 
	 * @param level
	 */
	boolean updateLevel(Level level);

	/**
	 * 
	 * @param levelID
	 */
	Level getLevelByID(int levelID);

	List<Level> getAllLevels();

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 */
	float getCustomerStat(Date startDate, Date endDate);

}