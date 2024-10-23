package com.example.cinema.service;

import com.example.cinema.model.payment.*;

import java.util.List;

public interface PaymentService {

	/**
	 * 
	 * @param payment
	 */
	boolean addPayment(Payment payment);

	/**
	 * 
	 * @param paymentID
	 */
	Payment getPaymentByID(int paymentID);

	List<Payment> getAllPayments();

	/**
	 * 
	 * @param customerID
	 */
	List<Payment> getPaymentsByCustomerID(int customerID);

	/**
	 * 
	 * @param typePayID
	 */
	List<Payment> getPaymentByType(int typePayID);

	/**
	 * 
	 * @param typePay
	 */
	boolean addTypePay(TypePay typePay);

	/**
	 * 
	 * @param typePayID
	 */
	TypePay getTypePayByID(int typePayID);

	List<TypePay> getAllTypePays();

	/**
	 * 
	 * @param payQR
	 */
	boolean addPayQR(PayQR payQR);

	/**
	 * 
	 * @param payQRID
	 */
	PayQR getPayQRByID(int payQRID);

	/**
	 * 
	 * @param payCard
	 */
	boolean addPayCard(PayCard payCard);

	/**
	 * 
	 * @param payCardID
	 */
	PayCard getPayCardByID(int payCardID);

	/**
	 * 
	 * @param payCash
	 */
	boolean addPayCash(PayCash payCash);

	/**
	 * 
	 * @param payCashID
	 */
	PayCash getPayCashByID(int payCashID);

	/**
	 * 
	 * @param type
	 */
	RevenueStat getRevenueStat(int type);

}