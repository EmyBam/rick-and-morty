import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
//  { path: '**', component: PageNotFoundComponent },
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {
    path: 'characters',
    component: CharactersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: UserFormComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: CharacterDetailsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
