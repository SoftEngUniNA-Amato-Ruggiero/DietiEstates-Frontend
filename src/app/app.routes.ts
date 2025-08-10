import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { UserProfile } from './user-profile/user-profile';
import { AgencyManagement } from './agency-management/agency-management';
import { authGuard } from './_guards/auth-guard';
import { managerGuard } from './_guards/manager-guard';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { noAuthGuard } from './_guards/no-auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Homepage,
    },
    {
        path: 'login',
        component: Login,
        canActivate: [noAuthGuard]
    },
    {
        path: 'logout',
        component: Logout,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: UserProfile,
        canActivate: [authGuard]
    },
    {
        path: 'agency',
        component: AgencyManagement,
        canActivate: [authGuard, managerGuard]
    }
];
