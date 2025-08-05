import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login/login.component';
import { NavigationComponent } from './pages/Navigation/navigation/navigation.component';
import { TruckDataComponent } from './pages/Navigation/TruckData/truck-data/truck-data.component';
import { PODPhotoComponent } from './pages/PODPHOTO/podphoto/podphoto.component';
import { BilladdComponent } from './pages/billImage/billadd/billadd.component';

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
                    path:'TRUCK',
                    component:TruckDataComponent
                },
                {
                    path:'PODPHOTO',
                    component:PODPhotoComponent
                }
                ,
                {
                    path:'BILLPHOTO',
                    component:BilladdComponent
                }
            ]
        }
    ];
