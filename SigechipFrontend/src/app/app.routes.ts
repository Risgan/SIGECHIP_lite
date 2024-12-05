import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a la página de inicio
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: DashboardPageComponent,
            },
            {
                path: 'pet',
                component: PetPageComponent,
            },
            {
                path: 'user',
                component: UserPageComponent,
            },
            {
                path: 'contact',
                component: ContactPageComponent,
            }
        ]
    },
    { path: '**', redirectTo: '/login' },
    { path: '404', component: NotfoundComponent }
];
