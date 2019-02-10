import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {environment} from '../environments/environment';

import { UtilService } from './services/util.service';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'unknown', component: PageNotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/unknown', pathMatch: 'full' },
  { path: 'home', component: HomeComponent  },
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: true })],
  exports: [RouterModule]
})

/*
* path: is represent to route
* component:is represented that which component will execute on given path
* canActive:is represented to authorized user
*/


export class AppRoutingModule {
    
}


