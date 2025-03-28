import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loading: boolean = false;
  errorMessage: string = '';
  
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  authService = inject(AuthService);
  router = inject(Router);
  
  onSubmit() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    
    const { username, password } = this.loginForm.value;
    console.log('Sending login request:', { username, password });
    this.loading = true;
    
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.loading = false;
        
        // Force checking if token is actually stored
        const token = this.authService.getAccessToken();
        console.log('Token stored successfully:', !!token);
        
        // Add a small delay before redirecting (optional but can help)
        setTimeout(() => {
          this.router.navigate(['/'])
            .then(success => console.log('Navigation result:', success))
            .catch(error => console.error('Navigation error:', error));
        }, 100);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loading = false;
        this.errorMessage = 'Email or Password is wrong!';
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
}