import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {PARAMS} from '../../to-do-inside/to-do-list/to-do-list.component';


@Component({
    selector: 'app-store-alert-detail',
    templateUrl: './store-alert-detail.component.html',
    styleUrls: ['./store-alert-detail.component.scss'],
})


export class StoreAlertDetailComponent implements OnInit {
    user: any;
    params = PARAMS;
    data: any;
    public prop: any;


    constructor(private route: ActivatedRoute, private router: Router) {
        if (this.route.snapshot.data['data']) {
            this.prop = this.route.snapshot.data['data']['result'];
            console.log(this.prop);
        }
    }

    ngOnInit() {
    }

    createToDo(item) {
        const navigationExtras: NavigationExtras = {
            state: {
                channel: this.prop.channel,
                store: this.prop.store,
                alertCode: this.prop.alert_code,
                item,
                store_id: this.prop.store_id
            }
        };
        this.router.navigate(['store-alert/create-to-do'], navigationExtras);
    }


}
