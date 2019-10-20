import {Component, ViewChild} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

export declare const window: any;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    @ViewChild('content', {static: true}) public content: any;

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                public translate: TranslateService) {
        this.initializeApp();

    }

    initializeApp() {
        console.log('inited')
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByName('black');
            this.splashScreen.hide();
        });
    }


}
