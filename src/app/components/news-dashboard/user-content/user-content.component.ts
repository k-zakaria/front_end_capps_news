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
  filteredUsers: UserResVM[] = [];
  displayedUsers: UserResVM[] = []; // Utilisateurs affichés après pagination
  
  // Pagination
  itemsPerPage = 5;  // Nombre d'utilisateurs par page
  currentPage = 1;   // Page actuelle
  totalPages = 1;    // Nombre total de pages
  
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
        this.filteredUsers = users; // Pour l'instant, pas de filtrage
        this.updatePagination();
        this.loading = false;
        console.log(users);
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load users. Please try again.';
      },
    });
  }
  
  // Méthode pour mettre à jour la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    this.updateDisplayedUsers();
  }

  // Méthode pour mettre à jour les utilisateurs affichés
  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedUsers = this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Méthode pour aller à une page spécifique
  goToPage(page: number | string): void {
    if (page === '...') return;
    
    const pageNum = typeof page === 'string' ? parseInt(page) : page;
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.updateDisplayedUsers();
    }
  }

  // Générer le tableau des pages à afficher
  getPagesArray(): (number | string)[] {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      // Afficher toutes les pages si moins de 7 pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);
      
      // Afficher des points de suspension ou les pages autour de la page actuelle
      if (this.currentPage <= 3) {
        // Près du début
        pages.push(2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Près de la fin
        pages.push('...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        // Au milieu
        pages.push('...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    
    return pages;
  }

  openAddModal(): void {
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
  }

  closeRoleModal(): void {
    this.isRoleModalOpen = false;
    this.selectedUserId = null;
    this.selectedRole = '';
    this.errorMessage = '';
    this.successMessage = '';
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
        
        this.filteredUsers = this.users;
        this.updatePagination();
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
          this.filteredUsers = this.users;
          this.updatePagination();
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