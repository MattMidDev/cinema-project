package com.cinema.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.model.Film;
import com.cinema.service.FilmService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/films")
public class FilmController {

	private final FilmService filmService;
	
	public FilmController(FilmService filmService) {
		this.filmService = filmService;
	}
	
	@GetMapping
	public List<Film> getAllFilms() { 
		return filmService.getAllFilms();
	}
	
	@GetMapping("/range")
	public List<Film> getPublicFilmsByRange(
	        @RequestParam("start") String startRaw,
	        @RequestParam("end") String endRaw) {

	    LocalDate start = LocalDate.parse(startRaw.trim());
	    LocalDate end = LocalDate.parse(endRaw.trim());

	    return filmService.getActiveFilmsByDateRange(start, end);
	}
	
	@GetMapping("/range/past")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Film> getPastFilmsByRange(
	    @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
	    @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
	    
	    return filmService.getPastFilmsByDateRange(start, end);
	}
	
	@PostMapping
	public Film saveFilm(@RequestBody @Valid Film film) {
		return filmService.saveFilm(film);
	}
	
	@GetMapping("/current")
	public List<Film> getCurrentFilms() {
		
		return filmService.getCurrentFIlms();
	}
	
	@GetMapping("/past")
	public List<Film> getPastFilms() {
		
		return filmService.getPastFilms();
	}
}
