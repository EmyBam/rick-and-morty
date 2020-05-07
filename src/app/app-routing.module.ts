import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './character-details/character-details.component'
import { UserFormComponent } from './user-form/user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
//  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'login', component: UserFormComponent },
  { path: 'details/:id', component: CharacterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
