import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { retrieveUsers, createUser } from './services/user.service';


@NgModule({
    imports: [

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: 'retrieveUsers', useValue: retreiveUsers},
        {provide: 'createUser',    useValue: createUser},
    ]
})
export class AppModule {

}
