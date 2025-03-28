import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface AuthUser {
  id: number;
  username: string;
  role: string;
  email?: string; 
  permission: string[];
}

@Component({
  selector: 'app-profile-content',
  standalone: true, 
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.css'
})
export class ProfileContentComponent implements OnInit {
  private authService = inject(AuthService);
  
  profileForm = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: ''
  };

  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  activeTab: 'profile' | 'security' | 'preferences' = 'profile';

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.profileForm = {
        username: currentUser.username || '',
        email: currentUser.email || '', 
        firstName: '', 
        lastName: '',
        bio: ''
      };
      
      console.log('Loaded user data:', this.profileForm);
    } else {
      console.warn('No authenticated user found');
    }
  }

  setActiveTab(tab: 'profile' | 'security' | 'preferences') {
    this.activeTab = tab;
  }

  saveProfile() {
    console.log('Saving profile', this.profileForm);
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.log('Changing password', this.passwordForm);
  }

  getUserInitials(): string {
    if (this.profileForm.firstName && this.profileForm.lastName) {
      return (this.profileForm.firstName.charAt(0) + this.profileForm.lastName.charAt(0)).toUpperCase();
    } else if (this.profileForm.username) {
      return this.profileForm.username.charAt(0).toUpperCase();
    }
    return '?';
  }
}