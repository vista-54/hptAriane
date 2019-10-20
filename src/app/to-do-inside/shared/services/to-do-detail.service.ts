import {ModalController} from '@ionic/angular';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {APP_URL} from '../../../shared/constants/url';
import {Injectable} from '@angular/core';
import {RequestService} from '../../../shared/services/request.service';
import {TodoResponse} from '../../../tabs/shared/services/to-do.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class ToDoDetailService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    resolve(route: ActivatedRouteSnapshot) {
        const taskId = route.paramMap.get('task_id');
        const userId = JSON.parse(localStorage['user']).userid;
        return this.view({user_id: userId, task_id: taskId});
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
}
