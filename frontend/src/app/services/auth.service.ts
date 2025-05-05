import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { EventEmitter } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
  
    constructor(private http: HttpClient, private router: Router) {
      const currentUser = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  
    public get currentUserValue() {
      return this.currentUserSubject.value;
    }
    
    getToken(): string {
      const currentUser = this.currentUserValue;
      return currentUser ? currentUser.token : '';
    }
  
    register(username: string, password: string, role: string = 'user'): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/register`, { username, password, role });
    }
  
    login(username: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
    }
  
    logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }