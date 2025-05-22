import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'crear-categoria',component:NewCategoryComponent},
    
    {path:'**',component:ErrorComponent}
];
