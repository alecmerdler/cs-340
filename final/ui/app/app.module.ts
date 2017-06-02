import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { UserModel } from '../models/user/user.model';
import { MediaModel } from '../models/media/media.model';
import { RecommendationModel } from '../models/recommendation/recommendation.model.model';


@NgModule({
    imports: [

    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: UserModel, useClass: UserModel},
        {provide: MediaModel, useClass: MediaModel},
        {provide: RecommendationModel, useClass: RecommendationModel},
    ]
})
export class AppModule {

}
