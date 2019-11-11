import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ComponentsModule} from './shared/components/components.module';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {TranslateModule} from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot({scrollAssist: true}), AppRoutingModule, SharedModule, ComponentsModule,
        TranslateModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        InAppBrowser,
        WebView,
        Geolocation
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
