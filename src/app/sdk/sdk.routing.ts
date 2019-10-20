import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeSdkComponent} from './home-sdk/home-sdk.component';
import {SdkComponent} from './sdk.component';
import {SdkService} from './home-sdk/sdk.service';
import {TutorialSdkComponent} from './tutorial/tutorial-sdk.component';
import {PrepareSdkComponent} from './prepare-sdk/prepare-sdk.component';

const routes: Routes = [
    {
        path: '', component: SdkComponent, children: [
            {
                path: 'home-sdk', component: HomeSdkComponent, resolve: {
                    data: SdkService
                }
            },
            {path: 'tutorial', component: TutorialSdkComponent},
            {path: 'prepare', component: PrepareSdkComponent},
            {
                path: '', redirectTo: 'prepare', pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SdkRouting {
}
