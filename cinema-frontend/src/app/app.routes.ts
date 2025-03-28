import { Routes } from '@angular/router';

import { FilmListComponent } from './components/film-list/film-list.component';
import { LoginComponent } from './components/login.component';
import { AdminPanelComponent } from './components/admin-panel.component';
import { FilmSearchComponent } from './components/film-search/film-search.component';
export const routes: Routes = [
  { path: '', component: FilmListComponent },        // Homepage pubblica
  { path: 'login', component: LoginComponent },      // Login admin
  { path: 'admin', component: AdminPanelComponent },  // Dashboard protetta
  { path: 'ricerca', component: FilmSearchComponent }, // Ricerca per data
];
