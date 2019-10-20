import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AboutModalComponent} from '../shared/components/about-modal/about-modal.component';
import {ModalController} from '@ionic/angular';

export declare const navigator;

@Component({
    selector: 'app-home',
    templateUrl: './sdk.component.html',
    styleUrls: ['./sdk.component.scss'],
})
export class SdkComponent implements OnInit {

    widgets: any;
    header: any;
    state: any;

    constructor(private router: Router, translate: TranslateService, private modalController: ModalController) {
        translate.use('en');
        translate.setDefaultLang('en');

    }

    ngOnInit() {
        console.log('init');
    }

    leave() {
        navigator['app'].exitApp();
    }

    about() {
        this.presentModal();
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: AboutModalComponent,
            cssClass: 'shareModal',
        });
        return await modal.present();
    }


}
