import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToDoListService} from '../shared/services/to-do-list.service';
import {NavController} from '@ionic/angular';

declare interface TodoParams {
    title: string;
    image: string;
    changed_value: string;
}

export const PARAMS = {
    SHARE: {
        icon: '../assets/todo/todo_market_share.svg',
        style: 'market_share',
        title: 'market share',
        translate: 'market'
    },
    SALES: {
        icon: '../assets/todo/todo_sales.svg',
        style: 'sales',
        title: 'sales',
        translate: 'sales'

    },
    SERVICE: {
        icon: '../assets/todo/todo_service_level.svg',
        style: 'service_level',
        title: 'service level',
        translate: 'service'
    },
    STOCK: {
        icon: '../assets/todo/todo_stock_days.svg',
        style: 'stock_days',
        title: 'stock days',
        translate: 'stock'
    },
    BASKET: {
        icon: '../assets/todo/todo_numbers_of_basket.svg',
        style: 'number_of_basket',
        title: 'number of basket',
        translate: 'number'
    },
    PROMO: {
        icon: '../assets/todo/todo_promo.svg',
        style: 'promotion_intensity',
        title: 'promotion intensity',
        translate: 'promo'
    }
};

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {

    todoParams: TodoParams;
    defaultType = '0';
    defaultDirection = 1;
    @Input('prop') public prop: any;
    @Input('alertCode') public alertCode: any;
    order: 'ASC';
    params = PARAMS;
    user: any;
    taskList: any[];
    filterField = 0;
    taskIds = [];
    isVisible = false;
    isSelectedAll = false;


    constructor(private route: ActivatedRoute,
                private toDoListService: ToDoListService,
                private navController: NavController) {
        this.user = JSON.parse(localStorage['user']);
        this.reloadData();
    }

    ionViewWillEnter() {
        this.reloadData();
        console.log('will enter');
    }

    ngOnInit() {
        console.log(this.alertCode);
        // this.filterByStatus(this.defaultType);
    }

    taskTypeChanged(event) {
        this.defaultType = event.detail.value;
        this.filterByStatus(this.defaultType);
        this.resetParams();


    }

    filterByStatus(status) {
        this.taskList = this.prop.filter(item => {
            item.selected = false;
            debugger
            return item.complete === status;
        });
    }

    orderBy(field) {
        if (field === this.filterField) {
            this.filterField = 0;
        } else {
            this.filterField = field;
        }
        this.defaultDirection = -1 * this.defaultDirection;
        this.taskList = this.taskList.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1 * this.defaultDirection;
            }
            if (a[field] > b[field]) {
                return this.defaultDirection;
            }
            return 0;
        });
    }

    select(item) {
        const isItemExist = this.taskIds.indexOf(item.task_id);
        if (isItemExist === -1) {
            this.taskIds.push(item.task_id);
        } else {
            this.taskIds.splice(isItemExist, 1);
        }
        this.isVisible = this.taskIds.length > 0;
    }

    changeStatus() {
        this.toDoListService.markAs({
            user_id: this.user.userid,
            task_id: this.taskIds,
            status: this.defaultType === '0' ? '1' : '0'

        }).subscribe(res => {
            // reload list
            this.loadData();
        });
    }

    delete() {
        this.toDoListService.delete({
            user_id: this.user.userid,
            task_id: this.taskIds,
            status: '1'
        }).subscribe(res => {
            // reload list
            this.loadData();
        });
    }

    loadData() {
        const data = {
            alert_code: this.alertCode,
            user_id: this.user.userid
        };
        this.toDoListService.list(data)
            .subscribe(res => {
                this.prop = res.result;
                this.resetParams();
                this.filterByStatus(this.defaultType);
            });
    }

    selectAll(isSelectedAll) {
        const isSelected = isSelectedAll.detail.checked;
        if (isSelected) {
            this.taskList.map(item => {
                this.taskIds.push(item.task_id);
                item.selected = true;
            });
        } else {
            this.taskIds = [];
            this.taskList.map(item => {
                item.selected = false;
            });
        }
        this.isVisible = this.taskIds.length > 0;

    }


    resetParams() {
        this.isSelectedAll = false;
        this.taskIds = [];
        this.isVisible = false;
        this.filterField = 0;
    }

    reloadData() {
        if (this.route.snapshot.data['data']) {
            this.prop = this.route.snapshot.data['data']['result'];
            this.alertCode = this.route.snapshot.params.code;
            console.log(this.prop);
            this.filterByStatus(this.defaultType);
        }
    }

    openTodo() {
        // /tabs/to-do
        debugger
        this.navController.navigateRoot(['/tabs/to-do']);
    }
}
