import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-content',
  imports: [
    CommonModule, 
    FormsModule,  // Make sure FormsModule is imported
    RouterModule
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.css'
})
export class ProfileContentComponent implements OnInit {
  // Profile form data
  profileForm = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: ''
  };

  // Password form data
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Active tab
  activeTab: 'profile' | 'security' | 'preferences' = 'profile';

  constructor() {}

  ngOnInit(): void {
    // Initialize form data
    this.initializeProfileForm();
  }

  // Initialize profile form
  initializeProfileForm() {
    // Here you would typically load user data from a service
    this.profileForm = {
      username: 'johndoe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      bio: ''
    };
  }

  // Change active tab
  setActiveTab(tab: 'profile' | 'security' | 'preferences') {
    this.activeTab = tab;
  }

  // Save profile
  saveProfile() {
    console.log('Saving profile', this.profileForm);
    // Implement profile save logic
  }

  // Change password
  changePassword() {
    // Validate password
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.log('Changing password', this.passwordForm);
    // Implement password change logic
  }

  // Get user initials (placeholder)
  getUserInitials(): string {
    const username = this.profileForm.username;
    return username 
      ? username.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')
      : '';
  }
}