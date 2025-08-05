import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { UserProfile } from './user-profile/user-profile';

export const routes: Routes = [
    {
        path: '',
        component: Homepage,
    },
    {
        path: 'profile',
        component: UserProfile,
        // canActivate: [AuthGuard]
    }
];
