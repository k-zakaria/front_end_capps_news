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
import { VesitorComponent } from './layouts/vesitor/vesitor.component';
import { DashbordsComponent } from './layouts/dashbords/dashbords.component';
import { ArticleComponent } from './pages/news-dashboard/article/article.component';
import { CategoryComponent } from './pages/news-dashboard/category/category.component';
import { authGuard } from './guards/auth.guard';
import { TagComponent } from './pages/news-dashboard/tag/tag.component';
import { UserComponent } from './pages/news-dashboard/user/user.component';
import { AuthorAuthorComponent } from './pages/news-dashboard/author-author/author-author.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

export const routes: Routes = [

    {
        path: 'dashboard',
        component: DashbordsComponent,
        children: [
            {
                path: 'article',
                component: ArticleComponent,
                canActivate: [authGuard],
            },
            {
                path: 'category',
                component: CategoryComponent,
                canActivate: [authGuard],
            },
            {
                path: 'tags',
                component: TagComponent,
                canActivate: [authGuard],
            },
            {
                path: 'users',
                component: UserComponent,
                canActivate: [authGuard],
            },
            {
                path: 'author/articles',
                component: AuthorAuthorComponent,
                canActivate: [authGuard],
            }
        ]
    },

    {
        path: 'vesitor',
        component: VesitorComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'news/:categoryId',
                component: NewsComponent,
            },
            {
                path: 'sport/:categoryId',
                component: SportComponent,
            },
            {
                path: 'business/:categoryId',
                component: BusinessComponent,
            },
            {
                path: 'innovation/:categoryId',
                component: InnovationComponent,
            },
            {
                path: 'culture/:categoryId',
                component: CultureComponent,
            },
            {
                path: 'arts/:categoryId',
                component: ArtsComponent,
            },
            {
                path: 'travel/:categoryId',
                component: TravelComponent,
            },
            {
                path: 'earth/:categoryId',
                component: EarthComponent,
            },
            {
                path: 'article/:id',
                component: ArticleDetailComponent
            }

        ]
    },
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
];
