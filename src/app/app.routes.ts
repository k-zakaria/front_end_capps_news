import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SportComponent } from './pages/sport/sport.component';
import { BusinessComponent } from './pages/business/business.component';
import { InnovationComponent } from './pages/innovation/innovation.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'sport',
        component: SportComponent,
    },
    {
        path: 'business',
        component: BusinessComponent,
    },
    {
        path: 'innovation',
        component: InnovationComponent,
    },
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
];
