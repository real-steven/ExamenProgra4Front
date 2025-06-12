import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { server } from '../../services/global';
import { UserService } from '../../services/user.service';

declare var bootstrap:any

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public posts:Array<Post>
  public url:string
  public identity:any
  private postId:number
  constructor(
    private postService:PostService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.posts=[]
    this.url=server.url
    this.identity=this.userService.getIdentity()
    this.loadPosts()
    this.postId=-1
  }
  loadPosts(){
    let idCat
    this.route.params.subscribe(params=>{
      idCat=params['id']
    })
    if(idCat){
      //Buscar por categoria
      console.log("Categoria:"+idCat)
      this.getPostsByCategory(idCat)
    }else{
      this.getPosts()
    }
  }
  private getPostsByCategory(idCat:number){
    this.postService.getPostsByCategory(idCat).subscribe({
       next:(response:any)=>{
        console.log(response)
        this.posts=response
      },
      error:(err:Error)=>{
        console.log(err)
      }
    })

  }
  private getPosts(){
    this.postService.getPosts().subscribe({
      next:(response)=>{
        console.log(response)
        this.posts=response
      },
      error:(err:Error)=>{
        console.log(err)
      }
    })
  }
  openModal(id:number):void{
    this.postId=id
    const modelDOM=document.getElementById('deleteModal')
    const modal= new bootstrap.Modal(modelDOM)
    
    modal.show()
  }
  deletePost(){
    console.log(this.postId)
    //Llamamos al metodo eliminar del postService
    const modalDOM=document.getElementById('deleteModal')
    modalDOM?.setAttribute("data-bs-dismiss","modal")
  }

}
