package com.example.cinema.model.user;

import java.util.*;

public class Notification {

	private String title;
	private String content;
	private Date date;
	List<User> user;

	public String getTitle() {
		return this.title;
	}

	/**
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return this.content;
	}

	/**
	 * 
	 * @param content
	 */
	public void setContent(String content) {
		this.content = content;
	}

}