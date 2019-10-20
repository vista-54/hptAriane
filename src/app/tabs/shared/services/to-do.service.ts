import {Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestService} from '../../../shared/services/request.service';
import {APP_URL} from '../../../shared/constants/url';
import {tap} from 'rxjs/operators';
import {AccessDaniedComponent} from '../../../shared/components/access-danied/access-danied.component';

export declare interface TodoResponse {
    code: string;
    message: string;
    result: {
        'Promotion Intensity': ResponseResult,
        'Sales': ResponseResult,
        'Market Share': ResponseResult,
    };
}

declare interface ResponseResult {
    code: string;
    alerts: string;
}

@Injectable()
export class ToDoService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }

    resolve() {
        const userId = JSON.parse(localStorage['user']).userid;
        return this.get({user_id: userId});
    }

    get(data) {
        return this.request.get(APP_URL.to_do.get, data)
            .pipe(tap((res: TodoResponse) => {
                },
                err => {
                    console.log(err);
                }));

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

}
