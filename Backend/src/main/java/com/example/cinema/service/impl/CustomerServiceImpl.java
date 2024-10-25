package com.example.cinema.service.impl;

import com.example.cinema.model.user.*;
import com.example.cinema.service.CustomerService;

import java.sql.Date;
import java.util.List;

public class CustomerServiceImpl implements CustomerService {

	/**
	 * 
	 * @param customer
	 */
	public boolean addCustomer(Customer customer) {
		// TODO - implement CustomerDaoImpl.addCustomer
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param customer
	 */
	public boolean updateCustomer(Customer customer) {
		// TODO - implement CustomerDaoImpl.updateCustomer
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param customerID
	 */
	public Customer getCustomerID(int customerID) {
		// TODO - implement CustomerDaoImpl.getCustomerID
		throw new UnsupportedOperationException();
	}

	public List<Customer> getAllCustomers() {
		// TODO - implement CustomerDaoImpl.getAllCustomers
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param customerID
	 * @param points
	 */
	public boolean earnPoints(int customerID, int points) {
		// TODO - implement CustomerDaoImpl.earnPoints
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param customerID
	 * @param points
	 */
	public boolean redeemPoints(int customerID, int points) {
		// TODO - implement CustomerDaoImpl.redeemPoints
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param level
	 */
	public boolean addLevel(Level level) {
		// TODO - implement CustomerDaoImpl.addLevel
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param level
	 */
	public boolean updateLevel(Level level) {
		// TODO - implement CustomerDaoImpl.updateLevel
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param levelID
	 */
	public Level getLevelByID(int levelID) {
		// TODO - implement CustomerDaoImpl.getLevelByID
		throw new UnsupportedOperationException();
	}

	public List<Level> getAllLevels() {
		// TODO - implement CustomerDaoImpl.getAllLevels
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 */
	public float getCustomerStat(Date startDate, Date endDate) {
		// TODO - implement CustomerDaoImpl.getCustomerStat
		throw new UnsupportedOperationException();
	}

}