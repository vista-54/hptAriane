import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {APP_URL} from '../../shared/constants/url';
import {RequestService} from '../../shared/services/request.service';
import {TodoResponse} from '../../tabs/shared/services/to-do.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class AlertDetailService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    resolve(route: ActivatedRouteSnapshot) {
        const alertCode = route.paramMap.get('code');

        const userId = JSON.parse(localStorage['user']).userid;
        return this.view({user_id: userId}, alertCode);
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