import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { UserModel } from '../models/user/user.model';


@NgModule({
    imports: [

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: UserModel, useClass: UserModel},
    ]
})
export class AppModule {

}
