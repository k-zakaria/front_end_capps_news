
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';

interface RegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  // onSubmit(formData: any): void {
  //   this.loading = true;
  //   this.errorMessage = '';
  //   this.successMessage = '';

  //   if (formData.password !== formData.confirmPassword) {
  //     this.errorMessage = 'Les mots de passe ne correspondent pas';
  //     this.loading = false;
  //     return;
  //   }

  //   const newUser = {
  //     ...formData,
  //     role: 'PARTICULIER'
  //   };

  //   this.authService.register(newUser).subscribe({
  //     next: () => {
  //       this.loading = false;
  //       this.successMessage = 'Inscription réussie ! Redirection...';
  //       setTimeout(() => {
  //         this.router.navigate(['/auth/login']);
  //       }, 2000);
  //     },
  //     error: (error) => {
  //       this.loading = false;
  //       this.errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
  //     }
  //   });
  // }
}
