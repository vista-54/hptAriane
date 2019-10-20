import {Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestService} from '../../shared/services/request.service';
import {APP_URL} from '../../shared/constants/url';
import {tap} from 'rxjs/operators';
import {TodoResponse} from '../../tabs/shared/services/to-do.service';

@Injectable()
export class StoreAlertService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    resolve() {
        const userId = JSON.parse(localStorage['user']).userid;
        return this.get({user_id: userId});
    }

    get(data) {
        return this.request.get(APP_URL.store_visit.alert_main, data);
    }

    view(data, alert) {
        return this.request.get(APP_URL.store_visit.alert_main + '/' + alert, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }
}
