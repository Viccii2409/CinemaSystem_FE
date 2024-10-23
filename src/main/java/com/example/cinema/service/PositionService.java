package com.example.cinema.service;

import com.example.cinema.model.user.*;

import java.util.List;

public interface PositionService {

	/**
	 * 
	 * @param position
	 */
	boolean addPosition(Position position);

	/**
	 * 
	 * @param position
	 */
	boolean editPosition(Position position);

	/**
	 * 
	 * @param positionID
	 */
	boolean updateStatusPosition(int positionID);

	/**
	 * 
	 * @param positionID
	 */
	Position getPositionByID(int positionID);

	List<Position> getAllPositions();

	/**
	 * 
	 * @param employeeID
	 * @param positionID
	 */
	boolean assignPosition(int employeeID, int positionID);

	/**
	 * 
	 * @param role
	 */
	boolean addRole(Role role);

	/**
	 * 
	 * @param role
	 */
	boolean updateRole(Role role);

	/**
	 * 
	 * @param roleID
	 */
	Role getRoleByID(int roleID);

	List<Role> getAllRole();

}