import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmService, Film } from '../../services/film.service';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './film-list.component.html'
})
export class FilmListComponent implements OnInit {
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getCurrentFilms().subscribe(films => {
      this.films = films;
    });    
  }
}
