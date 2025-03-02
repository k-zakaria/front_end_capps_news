// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  // onSubmit(username: string, password: string): void {
  //   this.loading = true;
  //   this.errorMessage = '';

  //   this.authService.login({ username, password }).subscribe({
  //     next: () => {
  //       this.loading = false;
  //       this.router.navigate(['/ebanky-news']);
  //     },
  //     error: (error) => {
  //       this.loading = false;
  //       this.errorMessage = error.message || 'Une erreur est survenue lors de la connexion';
  //       console.error('Login failed:', error);
  //     }
  //   });
  // }
}
