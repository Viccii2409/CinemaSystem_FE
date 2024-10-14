package com.springboot.cinemasystem.service;

import java.util.List;

import com.springboot.cinemasystem.model.entity.Discount;

public interface DiscountService {

	/**
	 * 
	 * @param discount
	 */
	boolean addDiscount(Discount discount);

	/**
	 * 
	 * @param discount
	 */
	boolean editDiscount(Discount discount);

	/**
	 * 
	 * @param discountID
	 */
	boolean updateStatusDiscount(int discountID);

	/**
	 * 
	 * @param discountCode
	 */
	Discount getDiscount(String discountCode);

	List<Discount> getAllDiscount();

	/**
	 * 
	 * @param typeDiscountID
	 */
	List<Discount> getTypeDiscount(int typeDiscountID);

}