import {Resolve, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {HomeResponse} from '../../shared/interfaces/response';
import {APP_URL} from '../../shared/constants/url';
import {RequestService} from '../../shared/services/request.service';

@Injectable()
export class SdkService implements Resolve<any> {


    constructor(public request: RequestService, public modalController: ModalController, public router: Router) {
    }

    resolve() {
        const navigation = JSON.parse(localStorage.getItem('sdk'));
        return this.login(navigation['state']);
    }


    public login(data) {
        return this.request.post(APP_URL.sdk.login, data)
            .pipe(tap((res: HomeResponse) => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }));
    }

    async presentSelectModal(Component: any, prop?: any) {
        const modal = await this.modalController.create({
            component: Component,
            cssClass: 'selectModal',
            componentProps: {prop}
        });
        return await modal.present();
    }
}
