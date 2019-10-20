import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {APP_URL} from '../../shared/constants/url';
import {RequestService} from '../../shared/services/request.service';
import {TodoResponse} from '../../tabs/shared/services/to-do.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class ReportService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    resolve(route: ActivatedRouteSnapshot) {
        const storeId = route.paramMap.get('store_id');

        const userId = JSON.parse(localStorage['user']).userid;
        return this.get({user_id: userId, store_id: storeId});
    }


    get(data) {
        return this.request.get(APP_URL.store_visit.report, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }

    send(data) {
        return this.request.post(APP_URL.store_visit.send_report, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }
}
