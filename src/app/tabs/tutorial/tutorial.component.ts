import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {


    url: SafeResourceUrl;

    constructor(modalCtrl: ModalController, private document: DocumentViewer,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

    getUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://app.hptariane.com/tutorial');
    }


}
