import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SdkComponent} from './sdk.component';
import {HomeSdkComponent} from './home-sdk/home-sdk.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import {ComponentsModule} from '../shared/components/components.module';
import {SdkRouting} from './sdk.routing';
import {SdkService} from './home-sdk/sdk.service';
import {TutorialSdkComponent} from './tutorial/tutorial-sdk.component';
import {TranslateModule} from '@ngx-translate/core';
import {PrepareSdkComponent} from './prepare-sdk/prepare-sdk.component';
import {DirectiveModule} from '../shared/directives/directive.module';


@NgModule({
    declarations: [SdkComponent, HomeSdkComponent, TutorialSdkComponent, PrepareSdkComponent],
    imports: [
        CommonModule,
        SdkRouting,
        FormsModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule,
        ComponentsModule,
        SharedModule,
        DirectiveModule
    ],
    providers: [
        SdkService
    ]
})
export class SdkModule {
}
