package com.example.cinema.service;

import com.example.cinema.model.movie.*;

import java.util.List;

public interface FeedbackService {

	/**
	 * 
	 * @param feedback
	 */
	boolean addFeedback(Feedback feedback);

	/**
	 * 
	 * @param movieID
	 */
	List<Feedback> getFeedbackByMovie(int movieID);

	/**
	 * 
	 * @param feedbackID
	 */
	Feedback getFeedbackByID(int feedbackID);

	/**
	 * 
	 * @param customerID
	 */
	List<Feedback> getFeedbacksByCustomerID(int customerID);

	/**
	 * 
	 * @param ratingID
	 * @param movieID
	 */
	List<Feedback> getFeedbacksByRating(int ratingID, int movieID);

}