import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-prepare-sdk',
    templateUrl: './prepare-sdk.component.html',
    styleUrls: ['./prepare-sdk.component.scss'],
})
export class PrepareSdkComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.router.navigate(['sdk/home-sdk']);
    }

}
