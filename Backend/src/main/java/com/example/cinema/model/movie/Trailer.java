package com.example.cinema.model.movie;

public class Trailer {

	private String link;
	private String describe;
	Movie movie;

	public String getLink() {
		return this.link;
	}

	/**
	 * 
	 * @param link
	 */
	public void setLink(String link) {
		this.link = link;
	}

	public String getDescribe() {
		return this.describe;
	}

	/**
	 * 
	 * @param describe
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
	}

}