package com.cinema.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.model.Film;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long>{
	List<Film> findByDataInizioLessThanEqualAndDataFineGreaterThanEqual(LocalDate end, LocalDate start);
	List<Film> findByDataInizioBeforeAndDataFineAfter(LocalDate end, LocalDate start);
	List<Film> findByDataFineBefore(LocalDate today);
	List<Film> findByDataFineGreaterThanEqual(LocalDate date);
	List<Film> findByDataInizioLessThanEqualAndDataFineGreaterThanEqualAndDataFineBefore(
		    LocalDate end, LocalDate start, LocalDate today
		);
}
