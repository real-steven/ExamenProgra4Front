import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {CategoryService} from "./services/category.service"
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-spa';
  public categories:any;
  private checkCategories;
  private checkIdentity;
  public identity:any;

  constructor(
    private categoryService:CategoryService,
    private userService:UserService
  
  ){
    this.loadCategories()
    this.checkCategories=setInterval(()=>{
        this.loadCategories()
    },5000)
    this.checkIdentity=setInterval(()=>{
      this.identity=userService.getIdentity()
    },500)
  }
  public loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.categories=response
      },
      error:(err:Error)=>{
        console.log(err)
        this.categories=null
      }
    })
  }
}
