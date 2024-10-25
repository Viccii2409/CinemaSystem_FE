package com.example.cinema.service;

import com.example.cinema.model.user.*;

public interface UserService {

	/**
	 * 
	 * @param account
	 */
	User login(Account account);

	/**
	 * 
	 * @param user
	 */
	void updateUser(User user);

	/**
	 * 
	 * @param user
	 */
	boolean addUser(User user);

	/**
	 * 
	 * @param userID
	 */
	User getUserByID(int userID);

	/**
	 * 
	 * @param password
	 */
	boolean changePassword(String password);

	/**
	 * 
	 * @param accountID
	 */
	boolean deleteAccount(int accountID);

}