package com.example.cinema.service;

import com.example.cinema.model.user.*;

import java.util.List;

public interface EmployeeService {

	/**
	 * 
	 * @param employee
	 */
	boolean addEmployee(Employee employee);

	/**
	 * 
	 * @param employee
	 */
	boolean editEmployee(Employee employee);

	/**
	 * 
	 * @param employeeID
	 */
	Employee getEmployeeByID(int employeeID);

	/**
	 * 
	 * @param employeeID
	 */
	boolean updateStatus(int employeeID);

	List<Employee> getAllEmployee();

	/**
	 * 
	 * @param positionID
	 */
	List<Employee> getEmployeeByPosition(int positionID);

	/**
	 * 
	 * @param admin
	 */
	boolean addAdmin(Admin admin);

	/**
	 * 
	 * @param admin
	 */
	boolean updateAdmin(Admin admin);

	/**
	 * 
	 * @param adminID
	 */
	Admin getAdminByID(int adminID);

	/**
	 * 
	 * @param manager
	 */
	boolean addManager(Manager manager);

	/**
	 * 
	 * @param manager
	 */
	boolean updateManager(Manager manager);

	/**
	 * 
	 * @param managerID
	 */
	Manager getManagerByID(int managerID);

	List<Manager> getAllManager();

	/**
	 * 
	 * @param customerService
	 */
	boolean addCustomerService(CustomerService customerService);

	/**
	 * 
	 * @param customerService
	 */
	boolean editCustomerService(CustomerService customerService);

	/**
	 * 
	 * @param customerServiceID
	 */
	boolean getCustomerService(int customerServiceID);

	/**
	 * 
	 * @param agent
	 */
	boolean addAgent(Agent agent);

	/**
	 * 
	 * @param agent
	 */
	boolean updateAgent(Agent agent);

	List<Agent> getAllAgent();

	/**
	 * 
	 * @param agentID
	 */
	Agent getAgent(int agentID);

}