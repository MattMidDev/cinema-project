import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService, Film } from '../services/film.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
  fb = inject(FormBuilder);
  filmService: FilmService = inject(FilmService);
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  filmForm = this.fb.group({
    titolo: [''],
    descrizione: [''],
    dataInizio: [''],
    dataFine: [''],
    orario: [''],
    sala: [''],
    genere: ['']
  });

  searchForm = this.fb.group({
    start: [''],
    end: ['']
  });

  filmsStorico: Film[] = [];
  filmsFiltrati: Film[] = [];

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.loadPastFilms();
    }
  }

  submit(): void {
    const form = this.filmForm.value;
    if (form.titolo && form.descrizione && form.dataInizio && form.dataFine && form.orario && form.sala && form.genere) {
      const newFilm: Film = {
        titolo: form.titolo,
        descrizione: form.descrizione,
        dataInizio: form.dataInizio,
        dataFine: form.dataFine,
        orario: form.orario,
        sala: form.sala,
        genere: form.genere
      };

      this.filmService.addFilm(newFilm).subscribe(() => {
        alert('Film aggiunto!');
        this.filmForm.reset();     
        this.loadPastFilms(); // 🔁 aggiorna lo storico subito
      });
    }
  }

  loadPastFilms(): void {
    this.filmService.getPastFilms().subscribe(data => {
      this.filmsStorico = data;
    });
  }

  annoForm = this.fb.group({
    anno: ['']
  });

  searchPastByYear(): void {
    const year = this.annoForm.value.anno;
    if (year) {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;
  
      this.filmService.getPastFilmsByRange(start, end).subscribe(films => {
        this.filmsStorico = films;
      });
    }
    
  }

  resetFiltri(): void {
    this.filmsFiltrati = [];
    this.annoForm.reset();
    this.loadPastFilms();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
