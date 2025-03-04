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
    this.loading = true;  // Set loading to true when login starts

    this.authService.login(username, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Email or Password is wrong!';
      },
    });
  }

}