import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'Home'},
  {path:'*',redirectTo:'Home'},
  {path:'usuarios', component:UsersComponent},
  {path:'usuarios', children:[
    {path:'edit/:id',component:UserAddComponent},
    {path:'create',component:UserAddComponent}
  ]},
  {path:'PQRS',component:PostsComponent},
  {path:'Home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
