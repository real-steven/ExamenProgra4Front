import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Observable } from "rxjs";

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

}