import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FilmService, Film } from '../../services/film.service';

@Component({
  selector: 'app-film-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './film-search.component.html'
})
export class FilmSearchComponent {
  fb = inject(FormBuilder);
  filmService = inject(FilmService);

  searchForm = this.fb.group({
    start: [''],
    end: ['']
  });

  filteredFilms: Film[] = [];

  search(): void {
    const { start, end } = this.searchForm.value;
    console.log("Date inviate:", start, end);
  
    if (start && end) {
      this.filmService.getFilmsByRange(start, end).subscribe({
        next: (films) => this.filteredFilms = films,
        error: (err) => console.error("Errore nella richiesta", err)
      });
    }
  }
}
