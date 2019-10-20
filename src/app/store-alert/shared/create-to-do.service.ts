import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {APP_URL} from '../../shared/constants/url';
import {RequestService} from '../../shared/services/request.service';
import {TodoResponse} from '../../tabs/shared/services/to-do.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class CreateToDoService {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }


    save(data) {
        return this.request.post(APP_URL.to_do.create, data)
            .pipe(tap((res: TodoResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }
}