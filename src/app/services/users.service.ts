import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserElement {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http:HttpClient) { }

  ListUser():Observable<UserElement[]>{
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer 69fa60cf96112ad9f1583794ecf391838643007b1c6e1ab649944d49d441690b');
    return this.http.get<UserElement[]>('https://gorest.co.in/public/v2/users', {headers: headers});
  }

  GetUser(id:number):Observable<UserElement[]>{
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer 69fa60cf96112ad9f1583794ecf391838643007b1c6e1ab649944d49d441690b');
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<UserElement[]>('https://gorest.co.in/public/v2/users',{headers: headers, params: params});
  }

  saveUser(body:any){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer 69fa60cf96112ad9f1583794ecf391838643007b1c6e1ab649944d49d441690b');
    return this.http.post('https://gorest.co.in/public/v2/users', body, {headers: headers});
  }

  updateUser(body:UserElement){
    let params = new HttpParams();
    params = params.append('id', body.id);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer 69fa60cf96112ad9f1583794ecf391838643007b1c6e1ab649944d49d441690b');
    return this.http.put('https://gorest.co.in/public/v2/users/'+body.id, body, {headers: headers});
  }

  DeleteUser(id:number):Observable<UserElement[]>{
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer 69fa60cf96112ad9f1583794ecf391838643007b1c6e1ab649944d49d441690b');
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.delete<UserElement[]>('https://gorest.co.in/public/v2/users/'+id,{headers: headers});
  }
}
