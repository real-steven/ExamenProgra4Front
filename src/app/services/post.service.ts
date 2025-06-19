import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Observable } from "rxjs";
import { Post } from "../models/post";

@Injectable({providedIn:'root'}) export class PostService{
    public url:string
    private accessToken:string
    constructor(
        private http:HttpClient
    ){
        this.url=server.url
        this.accessToken=""
    }
    uploadImage(data:any,token:any):Observable<any>{
        this.accessToken="bearer "+token
        let headers=new HttpHeaders().set('Authorization',this.accessToken)
        return this.http.post(this.url+"post/upload",data,{headers})
    }
    createPost(post:Post,token:any):Observable<any>{
        this.accessToken="bearer "+token
        let headers=new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.accessToken)
        let options={
            headers
        }
        let data=JSON.stringify(post)
        return this.http.post(this.url+"post",data,options)

    }
    getPosts():Observable<any>{
        return this.http.get(this.url+"post")
    }
    getPostsByCategory(idCat:number){
        console.log(this.url+"post/cat/"+idCat)
        return this.http.get(this.url+"post/cat/"+idCat)
    }

getPostsByUser(userId: string): Observable<any> {
    return this.http.get(this.url + 'post-user/' + userId);
}

searchPosts(term: string): Observable<any> {
    const url = `${this.url}posts/search?q=${encodeURIComponent(term)}`;
    console.log(url); // Para depurar la URL
    return this.http.get(url);
}

deletePost(id: number): Observable<any> {
    // El backend espera DELETE a /posts/deleted/:id
    return this.http.delete(this.url + 'posts/deleted/' + id);
}

}
