import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OnBoardingComponent } from './pages/on-boarding/on-boarding.component';
import { UserDetailsComponent } from './pages/on-boarding/user-details/user-details.component';
import { JoinCreateOrgComponent } from './pages/on-boarding/join-create-org/join-create-org.component';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { TasksComponent } from './pages/main/tasks/tasks.component';

export const routes: Routes = [

    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'sign-up',
                component: RegisterComponent
            },
            {
                path: 'sign-in',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'on-boarding',
        component: OnBoardingComponent,
        children: [
            {
                path: 'user-details',
                component: UserDetailsComponent
            },
            {
                path: 'join-create',
                component: JoinCreateOrgComponent
            }
        ]
    },
    {
        path: 'app',
        component: MainComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            }, {
                path: 'tasks',
                component: TasksComponent
            }
        ]
    }
];
