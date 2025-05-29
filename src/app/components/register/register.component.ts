import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public status:number
  public user:User

  constructor(
    private userService:UserService
  ){
    this.status=-1
    this.user=new User(1,"","","user_role","","","")
  }
  changeStatus(st:number){
    this.status=st
    let countdown=timer(4000);
    countdown.subscribe(n=>{
      this.status=-1
    })
  }

  onSubmit(form:any){
    this.userService.createUser(this.user).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.generated_id){
          form.reset()
          this.changeStatus(0)
        }else{
          this.changeStatus(1)
        }
      },
      error:(error:Error)=>{
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}
