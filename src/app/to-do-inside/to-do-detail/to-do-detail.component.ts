import {Component, OnInit} from '@angular/core';
import {PARAMS} from '../to-do-list/to-do-list.component';
import {ActivatedRoute} from '@angular/router';
import {ToDoListService} from '../shared/services/to-do-list.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-to-do-detail',
    templateUrl: './to-do-detail.component.html',
    styleUrls: ['./to-do-detail.component.scss'],
})
export class ToDoDetailComponent implements OnInit {
    user: any;
    params = PARAMS;
    data: any;
    public prop: any;
    public alertCode: any;
    taskId: any;
    selectedDate: any;

    constructor(private toDetailService: ToDoListService,
                private route: ActivatedRoute, private navCtrl: NavController) {
        this.user = JSON.parse(localStorage['user']);
        if (this.route.snapshot.data['data']) {
            this.prop = this.route.snapshot.data['data']['result'];
            this.alertCode = this.route.snapshot.params.code;
            this.taskId = this.route.snapshot.params.task_id;
            console.log(this.prop);
        }

    }

    ngOnInit() {
        console.log(this.prop);
        console.log(this.alertCode);
    }


    complete() {
        const data = {
            user_id: this.user.userid,
            task_id: [this.taskId],
            completed_date: this.selectedDate,
            status: '1'
        };
        this.toDetailService.markAs(data)
            .subscribe(res => {
                if (res.code === '1') {
                    this.ok();
                }
            });
    }

    delete() {
        const data = {
            user_id: this.user.userid,
            task_id: [this.taskId],
        };
        this.toDetailService.delete(data)
            .subscribe(res => {
                console.log(res);
                if (res.code === '1') {
                    this.ok();
                }
            });
    }

    ok() {
        this.navCtrl.back();
    }
}
