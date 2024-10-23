package com.example.cinema.service;

import com.example.cinema.model.user.*;

public interface NotificationService {

	/**
	 * 
	 * @param notification
	 */
	boolean addNotification(Notification notification);

	/**
	 * 
	 * @param userID
	 * @param notificationID
	 */
	boolean sendNofitication(int userID, int notificationID);

	/**
	 * 
	 * @param notificationID
	 */
	Notification getNotificationByID(int notificationID);

}