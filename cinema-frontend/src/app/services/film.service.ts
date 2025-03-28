import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';


export interface Film {
  id?: number;
  titolo: string;
  descrizione: string;
  dataInizio: string;
  dataFine: string;
  orario: string;
  sala: string;
  genere: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://localhost:8080/api/films';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  getFilmsByDate(start: string, end: string): Observable<Film[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<Film[]>(`${this.apiUrl}/range`, { params });
  }

  getCurrentFilms() {
    return this.http.get<Film[]>(`${this.apiUrl}/current`);
  }  
  
  getPastFilms(): Observable<Film[]> {
    const auth = this.authService.getAuthorizationHeader();

    const headers = new HttpHeaders({
      Authorization: auth ?? ''
    });
    
    return this.http.get<Film[]>(`${this.apiUrl}/past`, {
      headers,
      withCredentials: true
    });  }

    getPastFilmsByRange(start: string, end: string) {
      const headers = this.getAuthHeaders();
      return this.http.get<Film[]>(`http://localhost:8080/api/films/range/past?start=${start}&end=${end}`, {
        headers,
        withCredentials: true
      });
    }
    
    private getAuthHeaders() {
      const credentials = this.authService.getAuthorizationHeader();
      return {
        Authorization: credentials ?? ''
      };
    }
    

  getFilmsByRange(start: string, end: string) {
    const cleanStart = encodeURIComponent(start.trim());
    const cleanEnd = encodeURIComponent(end.trim());
  
    return this.http.get<Film[]>(`http://localhost:8080/api/films/range?start=${cleanStart}&end=${cleanEnd}`);
  }
    
  addFilm(film: Film) {
    const auth = this.authService.getAuthorizationHeader();
  
    const headers = new HttpHeaders({
      Authorization: auth ?? ''
    });
  
    return this.http.post(this.apiUrl, film, {
      headers,
      withCredentials: true
    });
  }
  
}
