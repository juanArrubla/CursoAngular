import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

let ELEMENT_DATA: UserElement;

@Component({
  selector: 'app-users',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {

  genders = [{id: 'male', value: 'Masculino'}, {id: 'female', value: 'Femenino'}];

  users = {id: 0, name:'', email:'', gender:'', status:'active'}
  
  datosUsuarios! : UserElement;

  form: FormGroup;

  constructor(private route:ActivatedRoute, private router:Router, private fb: FormBuilder, private        usersService: UsersService, private _snackbar: MatSnackBar) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email:['', [Validators.email, Validators.required]],
      gender:['', Validators.required]
    })
  }

  ngOnInit(): void {
    let idUser = this.route.snapshot.paramMap.get('id');
    let idUser2 = idUser !== null ? parseInt(idUser) : 0;
    if(idUser2 != 0)
      this.listar(idUser2);
  }

  listar(id:number){
    this.usersService.GetUser(id).subscribe({
      next:(response)=>{
        this.datosUsuarios = response[0];
        this.form.setValue({
          name:[this.datosUsuarios.name],
          email:[this.datosUsuarios.email],
          gender:{id:'male', value:'Masculino'}
        })
        this.form.get('gender')?.setValue(this.datosUsuarios.gender);
      }
    })
  }

  save(){
    console.log(this.form);
    let idUser = this.route.snapshot.paramMap.get('id');
    let idUser2 = idUser !== null ? parseInt(idUser) : 0;
    this.users = {
      id:idUser2, 
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      gender: this.form.controls['gender'].value,
      status:'active'
    };
    
    console.log(this.users);
    if(idUser2 != 0){
      this.usersService.updateUser(this.users).subscribe({
        next:(response)=>{
          console.log(response);
          this.router.navigate(['/usuarios']);
          this._snackbar.open('El usuario se actualizó exitosamente','cerrar');
        }
      });
    }
    else{
      this.usersService.saveUser(this.users).subscribe({
        next:(response)=>{
          console.log(response);
          this.router.navigate(['/usuarios']);
          this._snackbar.open('El usuario se creo exitosamente','cerrar');
        }
      });
    }
  }

}
