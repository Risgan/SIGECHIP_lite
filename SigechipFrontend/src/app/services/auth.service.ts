import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Auth, ResponseAuth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl + 'Auth';
  
  constructor(private http: HttpClient) { }

  login(auth: Auth) {

    return this.http.post<ResponseAuth>(`${this.apiUrl}/login`,auth);
    
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  } 
}
