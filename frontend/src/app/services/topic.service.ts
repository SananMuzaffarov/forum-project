import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:3000/api/topics';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getTopics(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHttpOptions());
  }

  getTopic(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTopic(topic: any): Observable<any> {
    const currentUser = this.authService.currentUserValue;
    const author = currentUser ? currentUser.id : 'user***';
    return this.http.post<any>(this.apiUrl, topic, this.getHttpOptions());
  }

  updateTopic(id: string, topic: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, topic, this.getHttpOptions());
  }

  deleteTopic(topicId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${topicId}`, this.getHttpOptions());
  }
}
