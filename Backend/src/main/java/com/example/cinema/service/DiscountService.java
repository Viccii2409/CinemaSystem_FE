package com.example.cinema.service;

import com.example.cinema.model.payment.*;

import java.util.List;

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
	boolean updateDiscount(Discount discount);

	/**
	 * 
	 * @param discountID
	 */
	boolean updateStatusDiscount(int discountID);

	/**
	 * 
	 * @param discountID
	 */
	Discount getDiscountByID(int discountID);

	List<Discount> getAllDiscounts();

	/**
	 * 
	 * @param discountCode
	 */
	boolean validateDiscount(String discountCode);

	/**
	 * 
	 * @param discountCode
	 */
	Discount getDiscountByCode(String discountCode);

	/**
	 * @param typeDiscountID
	 */
	List<Discount> getDiscountsByType(int typeDiscountID);

	/**
	 * 
	 * @param typeDiscount
	 */
	boolean addTypeDiscount(TypeDiscount typeDiscount);

	/**
	 * 
	 * @param typeDiscount
	 */
	boolean editTypeDiscount(TypeDiscount typeDiscount);

	/**
	 * 
	 * @param typeDiscountID
	 */
	TypeDiscount getTypeDiscountByID(int typeDiscountID);

	List<TypeDiscount> getAllTypeDiscounts();

}