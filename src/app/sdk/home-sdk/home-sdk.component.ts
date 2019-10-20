import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AboutModalComponent} from '../../shared/components/about-modal/about-modal.component';
import {ModalController} from '@ionic/angular';

export declare const navigator;

@Component({
    selector: 'app-home',
    templateUrl: './home-sdk.component.html',
    styleUrls: ['./home-sdk.component.scss'],
})
export class HomeSdkComponent implements OnInit {

    widgets: any;
    header: any;
    state: any;

    constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService,
                private modalController: ModalController) {
        const navigation = this.router.getCurrentNavigation();
        this.state = navigation.extras.state;
        console.log(this.state);
        if (this.route.snapshot.data['data']) {
            const data = this.route.snapshot.data['data'];
            this.widgets = data.result;
            this.header = data.header;
        }
    }

    ngOnInit() {
        console.log('init');
    }






}
