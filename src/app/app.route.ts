import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login/login.component';
import { NavigationComponent } from './pages/Navigation/navigation/navigation.component';
import { TruckDataComponent } from './pages/Navigation/TruckData/truck-data/truck-data.component';

export const routes: Routes =
    [
        {
            path: '',
            component: MainPageComponent
        },
        
        {
            path: 'Login',
            component: LoginComponent
        },
        {
            path:'Navigation',
            component:NavigationComponent,
            children:[
                {
                    path:'',
                    component:TruckDataComponent
                }
            ]
        }
    ];
