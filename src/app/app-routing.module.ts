import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {environment} from '../environments/environment';
import {AuthGuard} from './auth/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {HolidaysComponent} from './holidays/holidays.component';
import {ResourcesComponent} from './resources/resources.component';
import {IdeasComponent} from './Ideas/ideas.component';

const routes: Routes = [
    {path:  environment.ROUTE_LOGIN, component: SigninComponent},
    {path: environment.ROUTE_HOME, component: HomeComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_ATTENDANCE, component: AttendanceComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_HOLIDAYS, component: HolidaysComponent, canActivate: [AuthGuard]},
    {path: environment.ROUTE_RESOURCES, component: ResourcesComponent, canActivate: [AuthGuard]},
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


