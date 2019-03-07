import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {environment} from '../environments/environment';
import {AuthGuard} from './auth/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {IdeasComponent} from './ideas/ideas.component';

const routes: Routes = [
    {path: 'login', component: SigninComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_IDEAS, component: IdeasComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_ADD_IDEA, component: IdeasComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_EDIT_IDEA, component: IdeasComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_SHARE_IDEA, component: IdeasComponent, canActivate: [AuthGuard]},
    {path: 'oops', component: PageNotFoundComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/oops', pathMatch: 'full'},
]


@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, initialNavigation: true})],
    exports: [RouterModule]
})

/*
* path: is represent to route
* component:is represented that which component will execute on given path
* canActive:is represented to authorized user
*/


export class AppRoutingModule {

}


