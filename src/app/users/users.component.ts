import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export interface UserElement {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const ELEMENT_DATA: UserElement[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
    
  genders = [{id: 1, value: 'Masculino'}, {id: 2, value: 'Femenino'}];

  users = {id: 0, name:'', email:'', gender:'', status:'active'}
  
  //form: FormGroup;

  constructor(private route:ActivatedRoute, private router:Router, private fb: FormBuilder, private usersService: UsersService, private _snackbar: MatSnackBar ) { 
    
//    console.log(this.route.snapshot.paramMap.get('id'));
//    this.form = this.fb.group({
//      name:['',Validators.required],
//      email:['', [Validators.email, Validators.required]],
//      gender:['',Validators.required]
//    })
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'gender','status', 'acciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
     this.listar();
  }

  listar(){
    this.usersService.ListUser().subscribe({
      next:(response)=>{
        console.log(response);
        const result = response.filter(x=>x.status==='active')
          this.dataSource = result;
      }
    })
  }

  crear(id:number){
    this.router.navigate(['/usuarios/edit',0]);
  }

  editar(id:number){
    this.router.navigate(['/usuarios/edit',id]);
  }

  eliminar(id:number){
    this.usersService.DeleteUser(id).subscribe({
      next:(response)=>{
        this._snackbar.open('El usuario se eliminó exitosamente','cerrar');
        this.listar();
      }
    })
  }

}
