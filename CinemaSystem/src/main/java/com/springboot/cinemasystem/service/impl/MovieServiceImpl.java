package com.springboot.cinemasystem.service.impl;

import java.util.List;

import com.springboot.cinemasystem.model.entity.Cast;
import com.springboot.cinemasystem.model.entity.Director;
import com.springboot.cinemasystem.model.entity.Feedback;
import com.springboot.cinemasystem.model.entity.Movie;
import com.springboot.cinemasystem.model.entity.Schedule;
import com.springboot.cinemasystem.service.MovieService;

public class MovieServiceImpl implements MovieService {

	@Override
	public boolean addMovie(Movie movie) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean editMovie(Movie movie) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Movie getMovie(int movieID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Movie> getGenre(int genreID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Movie> getListCommingSoonMovie() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Movie> getListShowNowMovie() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean updateStatusMovie(int movieID) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Cast getCast(int movieID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Director getDirector(int movieID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addCast(Cast cast) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updateCast(Cast cast) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean addDirector(Director director) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updateDirector(Director director) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean addSchedule(Schedule schedule) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updateStatusSchedule(int scheduleID) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Schedule> getScheduleMovie(int movieID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Feedback> getFeedback(int movieID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addFeedback(Feedback feedback) {
		// TODO Auto-generated method stub
		return false;
	}
}