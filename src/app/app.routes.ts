import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { RegisterComponent } from './components/register/register.component';
import { NewPostComponent } from './components/new-post/new-post.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'crear-categoria',component:NewCategoryComponent},
    {path:'registro',component:RegisterComponent},
    {path:'crear-post',component:NewPostComponent},
    
    {path:'**',component:ErrorComponent}
];
