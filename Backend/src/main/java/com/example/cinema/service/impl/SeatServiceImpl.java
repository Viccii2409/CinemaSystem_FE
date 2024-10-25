package com.example.cinema.service.impl;

import com.example.cinema.model.theater.*;
import com.example.cinema.service.TheaterService;

import java.sql.Date;
import java.util.List;

public class SeatServiceImpl implements TheaterService {

	/**
	 * 
	 * @param theater
	 */
	public boolean addTheater(Theater theater) {
		// TODO - implement SeatDaoImpl.addTheater
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param theater
	 */
	public boolean updaeTheater(Theater theater) {
		// TODO - implement SeatDaoImpl.updaeTheater
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param theaterID
	 */
	public Theater updateStatusTheater(int theaterID) {
		// TODO - implement SeatDaoImpl.updateStatusTheater
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param theaterID
	 */
	public Theater getTheaterByID(int theaterID) {
		// TODO - implement SeatDaoImpl.getTheaterByID
		throw new UnsupportedOperationException();
	}

	public List<Theater> getAllTheaters() {
		// TODO - implement SeatDaoImpl.getAllTheaters
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param room
	 */
	public boolean addRoom(Room room) {
		// TODO - implement SeatDaoImpl.addRoom
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param roomID
	 */
	public boolean updateStatusRoom(int roomID) {
		// TODO - implement SeatDaoImpl.updateStatusRoom
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param theaterID
	 */
	public List<Room> getRoomByTheater(int theaterID) {
		// TODO - implement SeatDaoImpl.getRoomByTheater
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param roomID
	 */
	public Room getRoomByID(int roomID) {
		// TODO - implement SeatDaoImpl.getRoomByID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeRoomID
	 * @param theaterID
	 */
	public List<Room> getRoomsByTypeRoom(int typeRoomID, int theaterID) {
		// TODO - implement SeatDaoImpl.getRoomsByTypeRoom
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeRoom
	 */
	public boolean addTypeRoom(TypeRoom typeRoom) {
		// TODO - implement SeatDaoImpl.addTypeRoom
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeRoomID
	 */
	public TypeRoom getTypeRoomByID(int typeRoomID) {
		// TODO - implement SeatDaoImpl.getTypeRoomByID
		throw new UnsupportedOperationException();
	}

	public List<TypeRoom> getAllTypeRooms() {
		// TODO - implement SeatDaoImpl.getAllTypeRooms
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param seat
	 */
	public boolean addSeat(Seat seat) {
		// TODO - implement SeatDaoImpl.addSeat
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param seat
	 */
	public boolean editSeat(Seat seat) {
		// TODO - implement SeatDaoImpl.editSeat
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param roomID
	 */
	public List<Seat> getSeatByRoom(int roomID) {
		// TODO - implement SeatDaoImpl.getSeatByRoom
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param seatID
	 */
	public Seat getSeatByID(int seatID) {
		// TODO - implement SeatDaoImpl.getSeatByID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeSeat
	 */
	public boolean addTypeSeat(TypeSeat typeSeat) {
		// TODO - implement SeatDaoImpl.addTypeSeat
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeSeatID
	 */
	public TypeSeat getTypeSeatByID(int typeSeatID) {
		// TODO - implement SeatDaoImpl.getTypeSeatByID
		throw new UnsupportedOperationException();
	}

	public List<TypeSeat> getAllTypeSeats() {
		// TODO - implement SeatDaoImpl.getAllTypeSeats
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param startDate
	 * @param endDate
	 */
	public float getTheaterStat(Date startDate, Date endDate) {
		// TODO - implement SeatDaoImpl.getTheaterStat
		throw new UnsupportedOperationException();
	}

}