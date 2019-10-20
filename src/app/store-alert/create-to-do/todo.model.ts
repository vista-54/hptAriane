declare interface CreateToDo {
    user_id: number;
    alert_code: string;
    store_id: string;
    item_id: string;
    due_date: string;
    note: string;
    value: string;
}

export class ToDo implements CreateToDo {
    user_id = 0;
    alert_code = '';
    store_id = '';
    item_id = '';
    due_date = '';
    note = '';
    value = '';

    constructor() {

    }
}
