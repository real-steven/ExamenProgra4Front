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
  public myPosts: Array<Post>; // Para "Mis publicaciones"
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
    this.myPosts = [];
    this.url=server.url
    this.identity=this.userService.getIdentity()
    this.loadPosts()
    this.loadMyPosts(); // Cargar "Mis publicaciones" al iniciar
    this.postId=-1
  }
loadPosts() {
  let idCat;
  this.route.params.subscribe(params => {
    idCat = params['id'];
  });
  if (idCat) {
    // Buscar por categoria
    console.log("Categoria:" + idCat);
    this.getPostsByCategory(idCat);
  } else {
    this.getPosts();
  }
}

loadMyPosts() {
  const userId = this.identity?.id || this.identity?._id;
  if (userId) {
    this.postService.getPostsByUser(userId).subscribe({
      next: (response: any) => {
        this.myPosts = response;
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
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


searchPosts(term:string){
  this.postService.searchPosts(term).subscribe({
    next:(response:any)=>{
      console.log(response)
      this.posts=response
    },
    error:(err:Error)=>{
      console.log(err)
    }
  })

}

  showMyPosts() {
    // Si quieres los posts del usuario logueado:
    const userId = this.identity?.id || this.identity?._id; // Ajusta según tu modelo
    if (userId) {
      this.getPostsByUser(userId);
    } else {
      console.log('No hay usuario logueado');
    }
  }

private getPostsByUser(userId: string) {
  this.postService.getPostsByUser(userId).subscribe({
    next: (response: any) => {
      console.log(response);
      this.posts = response;
    },
    error: (err: Error) => {
      console.log(err);
    }
  });
}

deletePost() {
  if (this.postId > 0) {
    this.postService.deletePost(this.postId).subscribe({
      next: (response: any) => {
        // Elimina el post de ambas listas si existe
        this.posts = this.posts.filter(post => post.id !== this.postId);
        this.myPosts = this.myPosts.filter(post => post.id !== this.postId);
        // Cierra el modal (opcional, si usas Bootstrap)
        const modalDOM = document.getElementById('deleteModal');
        if (modalDOM) {
          modalDOM.setAttribute("data-bs-dismiss", "modal");
        }
        // Opcional: muestra mensaje de éxito
        // alert('Post eliminado correctamente');
      },
      error: (err: Error) => {
        console.log(err);
        // Opcional: muestra mensaje de error
        // alert('Error al eliminar el post');
      }
    });
  }
}


}