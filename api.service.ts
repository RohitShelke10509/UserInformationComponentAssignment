import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postUsers(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
  }))

  }
   getUsers(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
   }
   updateUser(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/posts"+id,data).pipe(map((res:any)=>{
      return res;
    }))
   }
   
   deleteUser(id:number){
    return this.http.delete("http://localhost:3000/posts"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
