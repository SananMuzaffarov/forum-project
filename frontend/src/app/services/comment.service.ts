import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getComments(topicId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${topicId}`, this.getHttpOptions());
  }

  getComment(commentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comment/${commentId}`, this.getHttpOptions());
  }

  createComment(topicId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${topicId}`, {...comment, author: this.authService.getToken()}, this.getHttpOptions());
  }

  updateComment(commentId: string, comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commentId}`, comment, this.getHttpOptions());
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commentId}`, this.getHttpOptions());
  }
}