import { Routes } from '@angular/router';
import { Homepage } from './_components/homepage/homepage';
import { UserProfile } from './_components/user-profile/user-profile';
import { AgentDashboard } from './_components/agent-dashboard/agent-dashboard';
import { AgencyManagement } from './_components/agency-management/agency-management';
import { Login } from './_components/login/login';
import { Logout } from './_components/logout/logout';
import { authGuard } from './_guards/auth-guard';
import { agentGuard } from './_guards/agent-guard';
import { managerGuard } from './_guards/manager-guard';
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
        path: 'dashboard',
        component: AgentDashboard,
        canActivate: [authGuard, agentGuard, managerGuard]
    },
    {
        path: 'agency',
        component: AgencyManagement,
        canActivate: [authGuard, managerGuard]
    }
];
