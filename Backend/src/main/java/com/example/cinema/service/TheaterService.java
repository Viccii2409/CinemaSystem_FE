package com.example.cinema.service;

import com.example.cinema.model.theater.*;

import java.sql.Date;
import java.util.List;

public interface TheaterService {

	/**
	 * 
	 * @param theater
	 */
	boolean addTheater(Theater theater);

	/**
	 * 
	 * @param theater
	 */
	boolean updaeTheater(Theater theater);

	/**
	 * 
	 * @param theaterID
	 */
	Theater updateStatusTheater(int theaterID);

	/**
	 * 
	 * @param theaterID
	 */
	Theater getTheaterByID(int theaterID);

	List<Theater> getAllTheaters();

	/**
	 * 
	 * @param room
	 */
	boolean addRoom(Room room);

	/**
	 * 
	 * @param roomID
	 */
	boolean updateStatusRoom(int roomID);

	/**
	 * 
	 * @param theaterID
	 */
	List<Room> getRoomByTheater(int theaterID);

	/**
	 * 
	 * @param roomID
	 */
	Room getRoomByID(int roomID);

	/**
	 * 
	 * @param typeRoomID
	 * @param theaterID
	 */
	List<Room> getRoomsByTypeRoom(int typeRoomID, int theaterID);

	/**
	 * 
	 * @param typeRoom
	 */
	boolean addTypeRoom(TypeRoom typeRoom);

	/**
	 * 
	 * @param typeRoomID
	 */
	TypeRoom getTypeRoomByID(int typeRoomID);

	List<TypeRoom> getAllTypeRooms();

	/**
	 * 
	 * @param seat
	 */
	boolean addSeat(Seat seat);

	/**
	 * 
	 * @param seat
	 */
	boolean editSeat(Seat seat);

	/**
	 * 
	 * @param roomID
	 */
	List<Seat> getSeatByRoom(int roomID);

	/**
	 * 
	 * @param seatID
	 */
	Seat getSeatByID(int seatID);

	/**
	 * 
	 * @param typeSeat
	 */
	boolean addTypeSeat(TypeSeat typeSeat);

	/**
	 * 
	 * @param typeSeatID
	 */
	TypeSeat getTypeSeatByID(int typeSeatID);

	List<TypeSeat> getAllTypeSeats();

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 */
	float getTheaterStat(Date startDate, Date endDate);

}