import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading: boolean = false;
  errorMessage: string = '';

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const { username, email, password } = this.registerForm.value;
    console.log('Sending register request:', { username, email, password });
    this.loading = true;

    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Registration failed Please try again.';
      },
    });
  }
}