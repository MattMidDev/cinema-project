package com.cinema.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cinema.model.Film;
import com.cinema.repository.FilmRepository;

@Service
public class FilmService {

	private final FilmRepository filmRepository;
	
	public FilmService(FilmRepository filmRepository) {
		this.filmRepository = filmRepository;
	}
	
	public List<Film> getAllFilms(){
		return filmRepository.findAll();
	}
	
	public List<Film> getFilmsByDateRange(LocalDate start, LocalDate end) {
	    return filmRepository.findByDataInizioLessThanEqualAndDataFineGreaterThanEqual(end, start);
	}
	
	public List<Film> getActiveFilmsByDateRange(LocalDate start, LocalDate end) {
	    return filmRepository.findByDataInizioLessThanEqualAndDataFineGreaterThanEqual(end, start)
	            .stream()
	            .filter(f -> !f.getDataFine().isBefore(LocalDate.now()))
	            .toList();
	}
	
	public List<Film> getPastFilmsByDateRange(LocalDate start, LocalDate end) {
	    LocalDate today = LocalDate.now();
	    List<Film> allPast = filmRepository.findByDataFineBefore(today);
	    
	    return allPast.stream()
	        .filter(f -> 
	            !f.getDataInizio().isAfter(end) && !f.getDataFine().isBefore(start)
	        )
	        .toList();
	}


	public Film saveFilm(Film film) {
		return filmRepository.save(film);
	}
	
	public List<Film> getCurrentFIlms() {
	    LocalDate today = LocalDate.now();
	    return filmRepository.findByDataFineGreaterThanEqual(today);
	}
	
	public List<Film> getPastFilms() {
		return filmRepository.findByDataFineBefore(LocalDate.now());
	}
}
