import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ToDoService} from '../shared/services/to-do.service';
import {PARAMS} from '../../to-do-inside/to-do-list/to-do-list.component';
import {MOCKTODO} from './mock.data';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
    params = PARAMS
    mock = MOCKTODO;
    user: any;
    data: any;
    dataObjects: any;

    constructor(private modalController: ModalController, private route: ActivatedRoute,
                private todoService: ToDoService, private router: Router) {
        this.user = JSON.parse(localStorage.user);
        console.log('constructor');

    }

    ngOnInit() {
        debugger
        console.log('init')
        const data = this.route.snapshot.data['data'];
        if (data.hasOwnProperty('result')) {
            this.dataObjects = data['result'];
            console.log(data['result']);
            this.data = this.valuesToArray(this.mock)
            console.log(this.data);
        }
    }

    ionViewWillEnter() {
debugger
        console.log('enter');
    }

    valuesToArray(obj) {
        const that = this;
        return Object.keys(obj).map(function (key) {
            let alerts = 0;
            if (that.dataObjects.hasOwnProperty(key)) {
                if (obj[key].alerts < that.dataObjects[key].alerts) {
                    alerts = that.dataObjects[key].alerts;
                }
            }
            return {
                key,
                val: {
                    alerts,
                    code: obj[key].code
                }
            };
        });
    }


    openList(alertCode: string) {

        const data = {
            alert_code: alertCode,
            user_id: this.user.userid
        };
        this.todoService.list(data)
            .subscribe(res => {
                // this.openToDoList(res.result, alertCode);
            });
    }

    openToDoList(code, alerts) {
        if (alerts === 0) {
            return false;
        }
        this.router.navigate(['/to-do/list', code]);
    }


}
