import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {LoggerService} from './services/logger.service';
import {UtilService} from './services/util.service';
import {PushNotificationService} from './services/push-notification.service';
import {AppConfigLoaderService} from './services/config-loader.service';
import {RouteConfigLoaderService} from "./services/route-configration.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {TokeninterceptorService} from "./auth/token-interceptor.service";
import {AjaxService} from "./services/ajax.service";
import {BroadcastService} from './services/broadcast.service';


import {AppRoutingModule} from './app-routing.module';

import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MessageComponent} from './message/message.component';
import {SigninComponent} from './signin/signin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {IdeasComponent} from './ideas/ideas.component';
import { ActivityComponent } from './activity/activity.component';
import { LiveComponent } from './live/live.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        MessageComponent,
        SigninComponent,
        PageNotFoundComponent,
        HomeComponent,
        IdeasComponent,
        ActivityComponent,
        LiveComponent,
        PushNotificationComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [
        LoggerService,
        UtilService,
        PushNotificationService,
        AppConfigLoaderService,
        AppConfigLoaderService,
        RouteConfigLoaderService,
        AjaxService,
        BroadcastService,
        AuthService,
        AuthGuard,
        TokeninterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokeninterceptorService,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [AppConfigLoaderService],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: get_route_settings,
            deps: [RouteConfigLoaderService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function init_app(appLoadService: AppConfigLoaderService) {
    return () => appLoadService.getAppConfig();
}

export function get_route_settings(appLoadService: RouteConfigLoaderService) {
    return () => appLoadService.setRouteConfig('login');
}

