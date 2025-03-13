import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserFormData, UserResVM } from '../../../model/UserLogin';

@Component({
  selector: 'app-user-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-content.component.html',
  styleUrl: './user-content.component.css'
})
export class UserContentComponent implements OnInit {
  users: UserResVM[] = [];
  loading = true;
  isModalOpen = false;
  editMode = false;
  selectedUserId: number | null = null;

  userForm: UserFormData = {
    username: '',
    email: '',
    password: '',
    role: 'USER'
  };

  roles: string[] = ['USER', 'ADMIN', 'AUTHOR'];
  errorMessage: string = '';
  successMessage: string = '';
  hidePassword: boolean = true;
  isRoleModalOpen: boolean = false;
  selectedRole: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load users. Please try again.';
      },
    });
  }

  openAddModal(): void {
    this.resetForm();
    this.editMode = false;
    this.selectedUserId = null;
    this.isModalOpen = true;
  }

  openEditModal(user: UserResVM): void {
    this.userForm = {
      username: user.username,
      email: user.email,
      password: '',
      role: user.role || 'USER'
    };
    this.editMode = true;
    this.selectedUserId = user.id !== undefined ? user.id : null;
    this.isModalOpen = true;
  }

  openRoleUpdateModal(user: UserResVM): void {
    this.selectedUserId = user.id !== undefined ? user.id : null;
    this.selectedRole = user.role || 'USER';
    this.isRoleModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  closeRoleModal(): void {
    this.isRoleModalOpen = false;
    this.selectedUserId = null;
    this.selectedRole = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  resetForm(): void {
    this.userForm = {
      username: '',
      email: '',
      password: '',
      role: 'USER'
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveUser(): void {
    if (this.editMode && this.selectedUserId) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.createUser(this.userForm).subscribe({
      next: (newUser) => {
        this.users.push(newUser);
        this.successMessage = 'User created successfully!';
        this.loading = false;

        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllUsers(); // Rafraîchir la liste
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to create user:', err);
        this.errorMessage = 'Failed to create user. Please try again.';
        this.loading = false;
      }
    });
  }

  updateUser(): void {
    if (!this.selectedUserId) return;

    this.loading = true;
    this.errorMessage = '';

    let dataToSend: any;

    // Si le mot de passe est vide lors de l'édition, on crée un objet sans cette propriété
    if (this.editMode && !this.userForm.password) {
      const { password, ...rest } = this.userForm;
      dataToSend = rest;
    } else {
      dataToSend = { ...this.userForm };
    }

    this.userService.updateUser(this.selectedUserId, dataToSend).subscribe({
      next: (updatedUser) => {
        // Mettre à jour l'utilisateur dans le tableau local
        const index = this.users.findIndex(u => u.id === this.selectedUserId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }

        this.successMessage = 'User updated successfully!';
        this.loading = false;

        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllUsers(); // Rafraîchir la liste
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to update user:', err);
        this.errorMessage = 'Failed to update user. Please try again.';
        this.loading = false;
      }
    });
  }

  updateUserRole(): void {
    if (!this.selectedUserId || !this.selectedRole) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.userService.updateUserRole(this.selectedUserId, this.selectedRole).subscribe({
      next: (updatedUser) => {
        // Mettre à jour l'utilisateur dans le tableau local
        const index = this.users.findIndex(u => u.id === this.selectedUserId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }

        this.successMessage = 'User role updated successfully!';
        this.loading = false;

        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeRoleModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to update user role:', err);
        this.errorMessage = 'Failed to update user role. Please try again.';
        this.loading = false;
      }
    });
  }


  deleteUser(userId: number | undefined): void {
    if (userId === undefined) {
      this.errorMessage = 'Cannot delete user with undefined ID';
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.loading = true;

      this.userService.deleteUser(userId).subscribe({
        next: () => {
          // Supprimer l'utilisateur du tableau local
          this.users = this.users.filter(u => u.id !== userId);
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
          this.errorMessage = 'Failed to delete user. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}