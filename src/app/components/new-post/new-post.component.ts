import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { Post } from '../../models/post';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  imports: [FormsModule,AngularEditorModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  public status:number
  public post:Post
  private token:any
  public categories:any
  public filename:string
  editorConfig:AngularEditorConfig={
    minHeight:"100px",
    height:"10em",
    enableToolbar:true,
    editable:true,
    placeholder:"Agregue aquí el contenido de su publicación!"
  }
  constructor(
    private categoryService:CategoryService,
    private userService:UserService,
    private postService:PostService
  ){
    this.status=-1
    this.post=new Post(1,0,0,"","","",null)    
    this.filename=""
    this.getCategories()
  }
  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response)=> {
          console.log(response)
          this.categories=response
      },
      error:(err:Error)=>{
        console.log(err)

      }
    })
  }
  onSubmit(form:any){
    let identity=this.userService.getIdentity()
    if(identity){
      this.post.user_id=identity.id
      this.post.category_id=+this.post.category_id
      console.log(this.post)
      this.postService.createPost(this.post,this.userService.getToken()).subscribe({
        next:(response:any)=>{
          if(response.generated_id){
            this.status=0
            form.reset()
          }else{
            this.status=1
          }
        },
        error:(err:Error)=>{
          this.status=1;
        }
      })
    }{
      //Enviar un mensaje de error Debe volver a loguearse
    }
    
  }

  uploadImage(e:any){
    const file:File =e.target.files[0]
    if(file){
      this.filename=file.name
      const formData=new FormData()
      formData.append("file0",file)
      this.token=this.userService.getToken()
      this.postService.uploadImage(formData,this.token).subscribe({
        next:(response)=>{
          console.log(response)
          this.post.image=response.file_name
          console.log(this.post)

        },
        error:()=>{
          this.post.image="noimage.png"
        }
      })

    }
  }

}
