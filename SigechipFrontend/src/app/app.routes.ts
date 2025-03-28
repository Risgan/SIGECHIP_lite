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
import { PetDetailPageComponent } from './pages/pet-detail-page/pet-detail-page.component';
import { CardRfidPageComponent } from './pages/card-rfid-page/card-rfid-page.component';

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
                path: 'petcreate',
                component: PetDetailPageComponent,
                data: { mode: 'create' }
            },
            {
                path: 'petdetail/:id',
                component: PetDetailPageComponent,
                data: { mode: 'detail' }
            },
            {
                path: 'petupdate/:id',
                component: PetDetailPageComponent,
                data: { mode: 'update' }
            },
            {
                path: 'user',
                component: UserPageComponent,
            },
            {
                path: 'contact',
                component: ContactPageComponent
            },
            {
                path: 'contact/:id',
                component: ContactPageComponent
            },
            {
                path: 'cards/:id',
                component: CardRfidPageComponent
            },
        ]
    },
    { path: '**', redirectTo: '/login' },
    { path: '404', component: NotfoundComponent }
];
