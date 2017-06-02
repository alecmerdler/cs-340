import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { UserModel } from '../models/user/user.model';
import { MediaModel } from '../models/media/media.model';


@NgModule({
    imports: [

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: UserModel, useClass: UserModel},
        {provide: MediaModel, useClass: MediaModel},
    ]
})
export class AppModule {

}
