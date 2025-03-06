import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SportComponent } from './pages/sport/sport.component';
import { BusinessComponent } from './pages/business/business.component';
import { InnovationComponent } from './pages/innovation/innovation.component';
import { CultureComponent } from './pages/culture/culture.component';
import { ArtsComponent } from './pages/arts/arts.component';
import { TravelComponent } from './pages/travel/travel.component';
import { EarthComponent } from './pages/earth/earth.component';
import { NewsComponent } from './pages/news/news.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
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
        path: 'culture',
        component: CultureComponent,
    },
    {
        path: 'arts',
        component: ArtsComponent,
    },
    {
        path: 'travel',
        component: TravelComponent,
    },
    {
        path: 'earth',
        component: EarthComponent,
    },
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
];
