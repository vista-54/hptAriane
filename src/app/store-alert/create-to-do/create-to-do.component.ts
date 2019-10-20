import {Component, OnInit} from '@angular/core';
import {PARAMS} from '../../to-do-inside/to-do-list/to-do-list.component';
import {Router} from '@angular/router';
import {CreateToDoService} from '../shared/create-to-do.service';
import {ModalController, NavController} from '@ionic/angular';
import {ToDo} from './todo.model';
import {ToDoNotSavedComponent} from '../../shared/components/to-do-not-saved/to-do-not-saved.component';


@Component({
    selector: 'app-create-to-do',
    templateUrl: './create-to-do.component.html',
    styleUrls: ['./create-to-do.component.scss'],
})
export class CreateToDoComponent implements OnInit {
    params = PARAMS;
    state: any;
    date: Date;
    toDo: ToDo;
    note: string;
    selectedDate: any;

    constructor(private router: Router, private createToDoService: CreateToDoService, private nav: NavController,
                private modalController: ModalController) {

        const user = JSON.parse(localStorage.user);
        const navigation = this.router.getCurrentNavigation();
        this.state = navigation.extras.state;
        console.log(this.state);
        this.date = new Date();
        this.toDo = new ToDo();
        this.toDo.user_id = user.userid;
        this.toDo.alert_code = this.state.alertCode;
        this.toDo.store_id = this.state.store_id;
        this.toDo.item_id = this.state.item.item_id;
        this.toDo.value = this.state.item.value;

    }

    checkBackButton() {
        if (this.selectedDate || this.note) {
            this.showConfirmationModal();
            return false;
        } else {
            this.nav.back();
        }
    }


    private async showConfirmationModal() {
        const modal = await this.modalController.create({
            component: ToDoNotSavedComponent,
            cssClass: 'shareModal',
        });
        modal.onDidDismiss()
            .then((detail) => {
                console.log(detail ? detail.data : null);
                if (detail.data) {
                    this.nav.back();
                }
            });
        return await modal.present();
    }

    ngOnInit() {


    }


    create() {
        this.toDo.note = this.note;
        this.toDo.due_date = this.selectedDate;
        this.createToDoService.save(this.toDo)
            .subscribe(next => {
                if (next.code === '0') { // need to refactor
                    this.nav.back();
                }
                console.log(next);
            })
        console.log(this.toDo);
    }

}
