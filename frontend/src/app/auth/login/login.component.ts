import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        // Navigate to topics after successful login
        this.router.navigate(['/topics']);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
