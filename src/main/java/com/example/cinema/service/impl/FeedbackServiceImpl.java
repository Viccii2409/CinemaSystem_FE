package com.example.cinema.service.impl;

import com.example.cinema.model.movie.*;
import com.example.cinema.service.FeedbackService;

import java.util.List;

public class FeedbackServiceImpl implements FeedbackService {

	/**
	 * 
	 * @param feedback
	 */
	public boolean addFeedback(Feedback feedback) {
		// TODO - implement FeedbackDaoImpl.addFeedback
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param movieID
	 */
	public List<Feedback> getFeedbackByMovie(int movieID) {
		// TODO - implement FeedbackDaoImpl.getFeedbackByMovie
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param feedbackID
	 */
	public Feedback getFeedbackByID(int feedbackID) {
		// TODO - implement FeedbackDaoImpl.getFeedbackByID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param customerID
	 */
	public List<Feedback> getFeedbacksByCustomerID(int customerID) {
		// TODO - implement FeedbackDaoImpl.getFeedbacksByCustomerID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ratingID
	 * @param movieID
	 */
	public List<Feedback> getFeedbacksByRating(int ratingID, int movieID) {
		// TODO - implement FeedbackDaoImpl.getFeedbacksByRating
		throw new UnsupportedOperationException();
	}

}