import {ModalController} from '@ionic/angular';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {TodoResponse} from '../../../tabs/shared/services/to-do.service';
import {APP_URL} from '../../../shared/constants/url';
import {Injectable} from '@angular/core';
import {RequestService} from '../../../shared/services/request.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class ToDoListService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    resolve(route: ActivatedRouteSnapshot) {
        const alertCode = route.paramMap.get('code');
        const userId = JSON.parse(localStorage['user']).userid;
        return this.list({user_id: userId, alert_code: alertCode});
    }


    list(data) {
        return this.request.get(APP_URL.to_do.list, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }

    view(data) {
        return this.request.get(APP_URL.to_do.view, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }

    markAs(data) {
        return this.request.post(APP_URL.to_do.update, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }

    delete(data) {
        return this.request.post(APP_URL.to_do.delete, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }
}
