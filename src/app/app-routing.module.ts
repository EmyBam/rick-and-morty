import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuardService} from './guards/auth.guard.service';
import {LoginGuardService} from './guards/login.guard.service';


const routes: Routes = [
//  { path: '**', component: PageNotFoundComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'characters',
    component: CharactersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: UserFormComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'details/:id',
    component: CharacterDetailsComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
