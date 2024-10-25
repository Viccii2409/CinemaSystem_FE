package com.example.cinema.service;

import com.example.cinema.model.ticketbought.*;

import java.util.List;

public interface SeatTicketService {

	/**
	 * 
	 * @param seatTicket
	 */
	boolean addSeatTicket(SeatTicket seatTicket);

	/**
	 * 
	 * @param seatTicketID
	 */
	SeatTicket getSeatTicketByID(int seatTicketID);

	float getBasePriceFinal();

	/**
	 * 
	 * @param basePrice
	 */
	boolean addBasePrice(BasePrice basePrice);

	/**
	 * 
	 * @param basePriceID
	 */
	BasePrice getBasePriceByID(int basePriceID);

	/**
	 * 
	 * @param typerUser
	 */
	boolean addTypeUser(TypeUser typerUser);

	/**
	 * 
	 * @param typeUserID
	 */
	TypeUser getTypeUserByID(int typeUserID);

	List<TypeUser> getAllTypeUsers();

	/**
	 * 
	 * @param dayOfWeek
	 */
	boolean addDayOfWeek(DayOfWeek dayOfWeek);

	/**
	 * 
	 * @param dayOfWeekID
	 */
	DayOfWeek getDayOfWeekByID(int dayOfWeekID);

	List<DayOfWeek> getAllDaysOfWeek();

	/**
	 * 
	 * @param timeFrame
	 */
	boolean addTimeFrame(TimeFrame timeFrame);

	/**
	 * 
	 * @param timeFrameID
	 */
	TimeFrame getTimeFrameByID(int timeFrameID);

	List<TimeFrame> getAllTimeFrames();

	/**
	 * 
	 * @param seatAvailability
	 */
	boolean addSeatAvailability(SeatAvailability seatAvailability);

	/**
	 * 
	 * @param seatAvailability
	 */
	boolean updateSeatAvailability(SeatAvailability seatAvailability);

	/**
	 * 
	 * @param seatAvailabilityID
	 */
	SeatAvailability getSeatAvailabilityByID(int seatAvailabilityID);

	/**
	 * 
	 * @param seatID
	 * @param showtimeID
	 */
	String checkSeatAvailability(int seatID, int showtimeID);

	/**
	 * 
	 * @param seatReservation
	 */
	boolean addSeatReservation(SeatReservation seatReservation);

	/**
	 * 
	 * @param reservationID
	 */
	SeatReservation getReservationByID(int reservationID);

	/**
	 * 
	 * @param customerID
	 */
	List<SeatReservation> getReservationsByCustomerID(int customerID);

}